import {ToastService} from '../toast.service';
export class CommonError{
    Status: string;
    Message: string;
    Err: string;
    Cause: string[];
    constructor(err: any, public toastService: ToastService) {
        this.Status = err.Status;
        this.Message = err.Message;
        this.Err = err.Err;
        this.Cause = err.Cause;
    }
    printErrorDetails(): void {
        console.log(' (' + this.Message + ') ->' + this.Cause.toString());
        this.Cause.forEach(detail => {
            if (!detail.includes('Status gRPC')) {
                this.toastService.showDanger(detail);
            }
        });
    }
}
