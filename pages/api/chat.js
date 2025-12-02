import { GoogleGenerativeAI } from "@google/generative-ai";
// Kita import data kursus agar AI tahu apa yang kita jual
import coursesData from '../../api/data.json';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    // Ambil pesan saat ini DAN riwayat chat dari frontend
    const { message, history } = req.body;

    try {
        // 1. Konfigurasi Model
        // Gunakan 'gemini-1.5-flash' agar respon cepat dan hemat biaya
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-pro",
            // 2. System Instruction (Otak/Konteks AI)
            // Di sini kita masukkan "Kepribadian" dan "Data" ke dalam otak AI
            systemInstruction: `
                Kamu adalah "EduBot", asisten virtual profesional untuk website kursus online "Eduko".
                
                TUGAS KAMU:
                - Menjawab pertanyaan pengunjung tentang kursus yang tersedia.
                - Memberikan rekomendasi kursus berdasarkan minat user.
                - Menjawab dengan ramah, singkat, dan menggunakan Emoji sesekali.
                - Menggunakan Bahasa Indonesia yang baik sesuai PUEBI.

                DATA KURSUS YANG KAMI MILIKI:
                ${JSON.stringify(coursesData)}

                ATURAN PENTING:
                - Jika user bertanya harga, jawab sesuai data di atas.
                - Jika user bertanya tentang kursus yang TIDAK ada di data, katakan mohon maaf kursus belum tersedia.
                - Jangan mengarang harga atau fitur yang tidak ada.
                - Jika ada masalah teknis, arahkan user email ke support@eduko.com.
            `
        });

        // 3. Memulai Chat dengan History (Agar AI ingat pembicaraan sebelumnya)
        // Kita perlu memformat history dari frontend ke format Gemini
        const chatHistory = history.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        // --- TAMBAHAN PENGAMANAN (SAFETY) ---
        // Jika history tidak kosong DAN elemen pertama adalah 'model', hapus elemen itu.
        if (chatHistory.length > 0 && chatHistory[0].role === 'model') {
            chatHistory.shift(); // Buang pesan pertama
        }

        const chat = model.startChat({
            history: chatHistory,
        });

        // 4. Kirim Pesan
        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        res.status(200).json({ reply: text });

    } catch (error) {
        console.error("Error Gemini:", error);
        res.status(500).json({ message: 'Maaf, server sedang sibuk.' });
    }
}