import { Router } from "express";
import {
    createNews,
    deleteNews,
    getNews,
    getNewsById,
    updateNews,
} from "../services/news.service";
const router = Router();

router.get("/", async (req, res) => {
    try {
        const page = +(req.query.page ?? "0");
        const size = +(req.query.size ?? "20");

        const news = await getNews(page, size);

        res.json(news);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = +req.params.id;

        const news = await getNewsById(id);

        if (!news) return res.status(404).json({});
        res.json(news);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});

router.post("/", async (req, res) => {
    try {
        const { id } = req.user! as { id: number };
        const { title, text } = req.body;

        if (!title || !text)
            return res.status(400).json({ error: "Bad Input" });

        const news = await createNews({ title, text, userId: id });

        res.json(news);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = +req.params.id;
        const { title, text } = req.body;

        const news = await updateNews(id, { text, title });
        if (!news) return res.status(404).json({});

        res.json(news);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = +req.params.id;

        const news = await deleteNews(id);

        if (!news) return res.status(404).json({});
        res.json(news);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});

export { router };
