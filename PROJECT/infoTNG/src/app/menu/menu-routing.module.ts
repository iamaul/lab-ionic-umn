import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPage } from './menu.page';

const routes: Routes = [
    {
        path: 'tabs',
        component: MenuPage,
        children: [
            {
                path: 'feeds',
                children: [
                    {
                        path: '',
                        loadChildren: './feeds/feeds.module#FeedsPageModule'
                    },
                    {
                        path: 'create',
                        loadChildren: './feeds/create/create.module#CreatePageModule'
                    },
                    {
                        path: 'detail/:id',
                        loadChildren: './feeds/detail/detail.module#DetailPageModule'
                    }
                ]
            },
            {
                path: 'profile',
                children: [
                    {
                        path: '',
                        loadChildren: './profile/profile.module#ProfilePageModule'
                    },
                    {
                        path: 'edit',
                        loadChildren: './profile/edit/edit.module#EditPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/menu/tabs/feeds',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/menu/tabs/feeds',
        pathMatch: 'full'
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})


export class MenuRoutingModule {}