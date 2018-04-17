var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
let MenuPage = class MenuPage {
    constructor() {
        // Basic root for our content view
        this.rootPage = TabsPage;
        // Reference to the app's root nav
        /*@ViewChild(Nav) nav: Nav;
       
        pages: PageInterface[] = [
          { title: 'Home', pageName: 'TabsPage', tabComponent: 'HomePage', index: 0, icon: 'home' },
          { title: 'MyAccount', pageName: 'TabsPage', tabComponent: 'MyAccountPage', index: 1, icon: 'contacts' },
        ];
      
        constructor(public navCtrl: NavController, public navParams: NavParams) {
        }
      
        openPage(page: PageInterface) {
          let params = {};
       
          // The index is equal to the order of our tabs inside tabs.ts
          if (page.index) {
            params = { tabIndex: page.index };
          }
       
          // The active child nav is our Tabs Navigation
          if (this.nav.getActiveChildNav() && page.index != undefined) {
            this.nav.getActiveChildNav().select(page.index);
          } else {
            // Tabs are not active, so reset the root page
            // In this case: moving to or from SpecialPage
            this.nav.setRoot(page.pageName, params);
          }
        }
      
        isActive(page: PageInterface) {
          // Again the Tabs Navigation
          let childNav = this.nav.getActiveChildNav();
       
          if (childNav) {
            if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
              return 'primary';
            }
            return;
          }
       
          // Fallback needed when there is no active childnav (tabs not active)
          if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
            return 'primary';
          }
          return;
        }
      
        ionViewDidLoad() {
          console.log('ionViewDidLoad MenuPage');
        }*/
    }
};
MenuPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-menu',
        templateUrl: 'menu.html',
    })
], MenuPage);
export { MenuPage };
//# sourceMappingURL=menu.js.map