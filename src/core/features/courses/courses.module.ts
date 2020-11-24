// (C) Copyright 2015 Moodle Pty Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreHomeRoutingModule } from '@features/mainmenu/pages/home/home-routing.module';
import { CoreHomeDelegate } from '@features/mainmenu/services/home-delegate';
import { CoreDashboardHomeHandler } from './services/handlers/dashboard-home';
import { CoreCoursesMyCoursesHomeHandler } from './services/handlers/my-courses.home';

const homeRoutes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () =>
            import('@features/courses/pages/dashboard/dashboard.module').then(m => m.CoreCoursesDashboardPageModule),
    },
    {
        path: 'courses/my',
        loadChildren: () =>
            import('@features/courses/pages/my-courses/my-courses.module')
                .then(m => m.CoreCoursesMyCoursesPageModule),
    },
];

const routes: Routes = [
    {
        path: 'courses',
        children: [
            {
                path: '',
                redirectTo: 'my',
                pathMatch: 'full',
            },
            {
                path: 'categories',
                redirectTo: 'categories/root', // Fake "id".
                pathMatch: 'full',
            },
            {
                path: 'categories/:id',
                loadChildren: () =>
                    import('@features/courses/pages/categories/categories.module')
                        .then(m => m.CoreCoursesCategoriesPageModule),
            },
            {
                path: 'all',
                loadChildren: () =>
                    import('@features/courses/pages/available-courses/available-courses.module')
                        .then(m => m.CoreCoursesAvailableCoursesPageModule),
            },
            {
                path: 'search',
                loadChildren: () =>
                    import('@features/courses/pages/search/search.module')
                        .then(m => m.CoreCoursesSearchPageModule),
            },
            {
                path: 'my',
                loadChildren: () =>
                    import('@features/courses/pages/my-courses/my-courses.module')
                        .then(m => m.CoreCoursesMyCoursesPageModule),
            },
            {
                path: 'preview',
                loadChildren: () =>
                    import('@features/courses/pages/course-preview/course-preview.module')
                        .then(m => m.CoreCoursesCoursePreviewPageModule),
            },
        ],
    },
];

@NgModule({
    imports: [
        CoreHomeRoutingModule.forChild(homeRoutes),
        RouterModule.forChild(routes),
    ],
    exports: [
        CoreHomeRoutingModule,
        RouterModule,
    ],
    providers: [
        CoreDashboardHomeHandler,
        CoreCoursesMyCoursesHomeHandler,
    ],
})
export class CoreCoursesModule {

    constructor(
        homeDelegate: CoreHomeDelegate,
        coursesDashboardHandler: CoreDashboardHomeHandler,
        coursesMyCoursesHandler: CoreCoursesMyCoursesHomeHandler,
    ) {
        homeDelegate.registerHandler(coursesDashboardHandler);
        homeDelegate.registerHandler(coursesMyCoursesHandler);
    }

}
