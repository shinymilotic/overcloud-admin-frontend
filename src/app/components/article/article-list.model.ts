import { Article } from "./article.model";

export interface ArticleList {
    articles: Article[];
    articleCount: number;
}