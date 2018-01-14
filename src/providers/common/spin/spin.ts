import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/of';
import { UtilProvider } from "../util/util";


@Injectable()
export class SpinInterceptor implements HttpInterceptor {
    public pendingRequests: number = 0;
    public showLoading: Boolean = false;

    constructor(private utilProvider: UtilProvider) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.pendingRequests++;
        this.turnOnModal();

        return next.handle(req)
            .map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {

                }
            })
            .catch(err => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        // JWT expired, go to login
                        // Observable.throw(err);
                    }
                }

                console.log('Caught error', err);
                return Observable.throw(err);
            })
        /* .finally(() => {
            console.log("Finally.. delaying, though.")
            var timer = Observable.timer(1000);
            timer.subscribe(t => {
                this.turnOffModal();
            });
        }); */
    }

    private turnOnModal() {
        if (!this.showLoading) {
            this.showLoading = true;
            this.utilProvider.loading('open');
            console.log("Turned on modal");
        }
        this.showLoading = true;
    }

    private turnOffModal() {
        this.pendingRequests--;
        if (this.pendingRequests <= 0) {
            if (this.showLoading) {
                this.utilProvider.loading('hide');
            }
            this.showLoading = false;
        }
        console.log("Turned off modal");
    }
}
