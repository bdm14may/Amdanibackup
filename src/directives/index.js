var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleplaceDirective } from './googleplace.directive';
var GooglePlaceModule = GooglePlaceModule_1 = (function () {
    function GooglePlaceModule() {
    }
    GooglePlaceModule.forRoot = function () { return { ngModule: GooglePlaceModule_1, providers: [] }; };
    return GooglePlaceModule;
}());
GooglePlaceModule = GooglePlaceModule_1 = __decorate([
    NgModule({
        imports: [BrowserModule, FormsModule, ReactiveFormsModule],
        declarations: [GoogleplaceDirective],
        exports: [GoogleplaceDirective],
        providers: []
    }),
    __metadata("design:paramtypes", [])
], GooglePlaceModule);
export { GooglePlaceModule };
var GooglePlaceModule_1;
//# sourceMappingURL=index.js.map