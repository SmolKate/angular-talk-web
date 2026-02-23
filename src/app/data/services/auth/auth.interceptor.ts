import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http"
import { AuthService } from "./auth-service"
import { inject } from "@angular/core"
import { catchError, switchMap, throwError } from "rxjs"

const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService)
    const accessToken = authService.accessToken
    if (!accessToken) return next(req)

    return next(addToken(req, accessToken)).pipe(
        catchError(error => {
            if (error.status === 403) {
                return refreshToken(authService, req, next)
            }
            const err = new Error('test')

            return throwError(() => err)
        })
    )
}

const refreshToken = (
    authService: AuthService,
    req: HttpRequest<any>,
    next: HttpHandlerFn
) => {
    return authService.refreshAuth().pipe(
        switchMap((res) => next(addToken(req, res.access_token))),
    )
}

const addToken = (req: HttpRequest<any>, accessToken: string) => {
    return req.clone({
        setHeaders: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export { authTokenInterceptor }