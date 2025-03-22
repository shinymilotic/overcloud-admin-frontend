import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { TagList } from "../components/tag/tag-list.model";

@Injectable({ providedIn: "root" })
export class TagService {
  
  constructor(private readonly http: HttpClient) {}

  public getTags(pageNumber?: number, itemsPerPage?: number) : Observable<TagList> {
    let params = new HttpParams();

    if (pageNumber != null && itemsPerPage != null) {
    params = params.set('pageNumber', pageNumber);
    params = params.set('itemsPerPage', itemsPerPage);  
    }
    
    return this.http
    .get<TagList>(`/admin/tags`, { params });
}

public deleteTag(tagId: string) : Observable<void> {
    let params = new HttpParams();

    if (tagId != null) {
    params = params.set('tagId', tagId);
    }

    return this.http.delete<void>(`/admin/tags`, { params });
}

public createTag(tag: any) : Observable<void> {
    return this.http.post<void>(`/admin/tags`, tag);
}
}
