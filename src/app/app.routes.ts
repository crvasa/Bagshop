import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { LoadingComponent } from './components/loading/loading.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';  
import { BagPageComponent } from './bag-page/bag-page.component';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';
import { OrderTrackPageComponent } from './components/order-track-page/order-track-page.component';
import { ContattiPageComponent } from './components/contatti-page/contatti-page.component';
import { ChisiamoPageComponent } from './components/chisiamo-page/chisiamo-page.component';



export const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'tag/:tag', component:HomeComponent},
  {path: 'bag/:id', component: BagPageComponent},
  {path: 'cart-page', component: CartPageComponent},
  {path: 'login', component: LoginPageComponent},
  { path: 'contatti', component: ContattiPageComponent },
  { path: 'chisiamo', component: ChisiamoPageComponent },
  {path: 'register', component: RegisterPageComponent},
  //{ path: 'orders', component: OrderTrackPageComponent },
  {path: 'search/:searchTerm', component: HomeComponent},
  { path: 'loading', component: LoadingComponent },
  { path: 'checkout', component: CheckoutPageComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentPageComponent, canActivate: [AuthGuard] },
{ path: 'orders', component: OrderTrackPageComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }
];