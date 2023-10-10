import { AppDataSource } from "../datasource";
import { CreateNewsDto } from "../dto/create-news.dto";
import { UpdateNewsDto } from "../dto/update-news.dto";
import { News } from "../models/News.entity";

const repository = AppDataSource.getRepository(News);

export function getNews(page: number, size: number) {
    return repository.find({ skip: page * size, take: size });
}

export function getNewsById(id: number) {
    return repository.findOne({ where: { id } });
}

export function createNews({ text, title, userId }: CreateNewsDto) {
    return repository.save({ text, title, user: { id: userId } });
}

export function updateNews(id: number, { text, title }: UpdateNewsDto) {
    return repository.save({ id, text, title });
}

export function deleteNews(id: number) {
    return repository.delete(id);
}
