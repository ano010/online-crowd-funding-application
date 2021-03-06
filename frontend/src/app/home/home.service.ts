import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable, Subscription, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Home} from './home';

export interface TargetAmount {
    currency: string;
    amount: number;
}

export interface CompagainLocation {
    country: string[];
    places: string[];
}

export interface PostResponses {
    target_amount: TargetAmount;
    campaign_location: CompagainLocation;
    places: string[];
    image_urls: string[];
    _id: string;
    title: string;
    description: string;
}

export interface NewPost {
    postResponse: Home[];
}



@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(protected http: HttpClient) { }

    url = 'api/v1/post/posts?page=0&limit=4';

    getConfigResponse(): Observable<HttpResponse<Home[]>> {
        return this.http.get<Home[]>(
            this.url, { observe: 'response' }).pipe(
            catchError(this.handleError)
        );
    }

    getConfig() {
        // now returns an Observable of Config
        return this.http.get<Home[]>(this.url);
    }


    protected handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    }

    //
    // getHero(id: number | string) {
    //     return this.getHeroes().pipe(
    //         // (+) before `id` turns the string into a number
    //         map((heroes: Hero[]) => heroes.find(hero => hero.id === +id))
    //     );
    // }


}
