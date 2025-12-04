import { GoogleGenerativeAI } from "@google/generative-ai";
// Import supabase client
import { supabase } from '../../lib/supabaseClient';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    // Ambil pesan saat ini DAN riwayat chat dari frontend
    const { message, history } = req.body;

    try {
        // --- PERUBAHAN DI SINI ---
        // Mengambil data dari tabel 'courses' di Supabase
        const { data: coursesData, error } = await supabase
            .from('courses') // Mengakses tabel 'courses'
            .select('*');

        if (error) {
            console.error("Error fetching Supabase:", error);
            throw new Error("Gagal mengambil data kursus dari database");
        }

        // Cek jika data kosong
        if (!coursesData || coursesData.length === 0) {
            console.warn("Data tabel 'courses' kosong atau tidak terbaca.");
        }

        // Konfigurasi Model Gemini
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-pro", 
            systemInstruction: `
                Kamu adalah "EduBot", asisten virtual profesional untuk website kursus online "Eduko".
                
                TUGAS KAMU:
                - Menjawab pertanyaan pengunjung tentang kursus yang tersedia.
                - Memberikan rekomendasi kursus berdasarkan minat user.
                - Menjawab dengan ramah, singkat, dan menggunakan Emoji sesekali.
                - Menggunakan Bahasa Indonesia yang baik sesuai PUEBI.

                DATA KURSUS (Live dari Database):
                ${JSON.stringify(coursesData)}

                ATURAN PENTING:
                - Jika user bertanya harga, jawab sesuai data di atas.
                - Jika user bertanya tentang kursus yang TIDAK ada di data, katakan mohon maaf kursus belum tersedia.
                - Jangan mengarang harga atau fitur yang tidak ada di data.
                - Jika ada masalah teknis, arahkan user email ke support@eduko.com.
            `
        });

        // Format history chat agar sesuai format Gemini
        const chatHistory = history.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        // Hapus pesan pertama jika role-nya 'model' (untuk menghindari error API)
        if (chatHistory.length > 0 && chatHistory[0].role === 'model') {
            chatHistory.shift(); 
        }

        const chat = model.startChat({
            history: chatHistory,
        });

        // Kirim pesan ke Gemini
        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ reply: text });

    } catch (error) {
        console.error("Error Gemini/Server:", error);
        res.status(500).json({ message: 'Maaf, ada gangguan pada server chatbot.' });
    }
}