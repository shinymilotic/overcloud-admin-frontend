import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { ArticleList } from "../components/article/article-list.model";

@Injectable({ providedIn: "root" })
export class ArticleService {

  constructor(private readonly http: HttpClient) {}

  getArticles(pageNumber?: number, itemsPerPage?: number): Observable<ArticleList> {
    let params = new HttpParams();
    
    if (pageNumber != null && itemsPerPage != null) {
      params = params.set('pageNumber', pageNumber);
      params = params.set('itemsPerPage', itemsPerPage);  
    }
    
    return this.http
      .get<ArticleList>(`/articles`, { params });
  }

  deleteArticle(articleId: string): Observable<void> {
    return this.http.delete<void>(`/articles/${articleId}`);
  }
}
