import { inject } from "@angular/core"
import { AuthService } from "./auth-service"
import { Router } from "@angular/router"

const canActivateAuth = () => {
    const isAuth = inject(AuthService).isAuth
    return isAuth || inject(Router).createUrlTree(['/login'])
}
const canActivateNotAuth = () => {
    const isAuth = inject(AuthService).isAuth
    return !isAuth || inject(Router).createUrlTree(['/'])
}
export { canActivateAuth, canActivateNotAuth }