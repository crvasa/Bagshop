import { inject } from '@angular/core';
import { HttpEvent, HttpEventType, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { LoadingService } from '../../services/loading.service';
import { Observable, tap } from 'rxjs';

let pendingRequests = 0;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  const loadingService = inject(LoadingService);

  pendingRequests++;
  loadingService.showLoading();

  return next(req).pipe(
    tap({
      next: (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response) {
          handleHideLoading(loadingService);
        }
      },
      error: () => {
        handleHideLoading(loadingService);
      }
    })
  );
};

function handleHideLoading(loadingService: LoadingService) {
  pendingRequests--;
  if (pendingRequests === 0) {
    loadingService.hideLoading();
  }
}
