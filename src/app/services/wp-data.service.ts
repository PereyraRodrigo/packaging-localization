import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';

const api_url = environment.API_URL;
const wyp_api_url = environment.WYP_API_URL;

@Injectable({
  providedIn: 'root'
})
export class WpDataService {

  constructor(private http: HttpClient) { }

  // add custom query params by url
  getPosts( page: number, itemsPerPage: number, querySearch?: string, categoryId?: string) { //get all blog posts

      // const url = `${ api_url }/posts?_embed&per_page=${itemsPerPage}&page=${page}&search=${querySearch}`;
      let querySearchString: string
      let queryCategory: string
      let queryPage = `page=${page}`;
      let queryQuantity = `&quantity=${itemsPerPage}`;
      querySearch  ? querySearchString = `&querySearch=${querySearch}` : querySearchString = '';
      categoryId  ? queryCategory = `&category=${categoryId}` : queryCategory = '';
      // let queryCategory = `category=${categoryId}&`;
      let fullQueryParams = `${queryPage}${queryQuantity}${querySearchString}${queryCategory}`
      const url = `${ wyp_api_url }/blog-items?${fullQueryParams}`;
      return this.http.get( url )
      .pipe(
        tap( (resp: any) => {
          // console.log(resp)
        })
      );

   }

  getGridItems(){
    const url = `${ api_url }/hero_grid?_embed`;
        return this.http.get( url )
                .pipe(
                  tap( (resp: any) => {
                  } )
                );
   }

  getPostsHome() { // get only posts needed for home section

    const url = `${ wyp_api_url }/blog-items?quantity=2`;

      return this.http.get( url )
                .pipe(
                  tap( (resp: any) => {
                    // console.log('blogpostss', resp);
                  }),
                  catchError( error => of(false) )
                );
      

  }

  getPostsBySlug( slug: String ) { //get post by slug
    const url = `${ api_url }/posts?slug=${slug}`;
      return this.http.get( url )
                .pipe(
                  tap( (resp: any) => {
                    //console.log(resp);
                  } )
                );
  }

  getCategoryInfo(id){
    //blog/category?
    const url = `${ wyp_api_url }/blog/category?category=${id}`;
  
      return this.http.get( url )
                .pipe(
                  tap( (resp: any) => {
                    // console.log(resp);
                  })
                );
  }

  getPostsByCategory( category: String, page, itemsPerPage ) { //get post by slug
    const url = `${ api_url }/posts?_embed&categories=${category}&per_page=${itemsPerPage}&page=${page}`;
       return this.http.get( url )
                .pipe(
                  tap( (resp: any) => {
                    //console.log(resp);
                  } )
                );
  }

  searchPosts( term: String){
    const url = `${ api_url }/posts?search=${term}`;
      return this.http.get( url )
                .pipe(
                  tap( (resp: any) => {
                    // console.log(resp);
                  })
                );
  }

  getCategories() { //get all categories
    const url = `${ api_url }/categories?per_page=100`;
      return this.http.get( url )
                .pipe(
                  tap( (resp: any) => {
                    // console.log(resp);
                  }),
                  catchError( error => of(false) )
                )
  }

  getPortfolioItems(itemsPerPage){ // get portfolio items
    const url = `${ api_url }/portfolio?per_page=${itemsPerPage}`;
      return this.http.get( url )
                .pipe(
                  tap( (resp: any) => {
                    // console.log(resp);
                  })
                );
  }

  getPortfolioItemsByCategory(category, pageNum?){ // get portfolio items
    const url = `${ wyp_api_url }/portfolio?category=${category}&page=${pageNum}`;
    return this.http.get( url )
              .pipe(
                tap( (resp: any) => {
                  // console.log(resp);
                })
              );
  }

  getPortfolioItemBySlug( slug: String ) { 

    const url = `${ api_url }/portfolio?slug=${slug}`;
    return this.http.get( url )
              .pipe(
                tap( (resp: any) => {
                  // console.log(resp);
                } )
              );
  }


getNextPortfolioItem( slug ){
  const res = this.getPortfolioItemBySlug(slug);
  return res;
}

getPortfolioCategoryInfo( category ){
  //console.log( category )
  return this.http.get('../helper/portfolio-categories.ts')
}

getPortfolioItemsHome(){
  const url = `${ wyp_api_url }/portfolio-home`;
    return this.http.get( url )
              .pipe(
                tap( (resp: any) => {
                  // console.log(resp);
                } )
              );

}
getJobPosts(){
  const url = `${ wyp_api_url }/jobs`;
    return this.http.get( url )
              .pipe(
                tap( (resp: any) => {
                  // console.log(resp);
                } )
              );
}

getCareerItemBySlug( slug: String ) { 

  const url = `${ wyp_api_url }/jobs/${slug}`;
  return this.http.get( url )
            .pipe(
              tap( (resp: any) => {
                // console.log(resp);
              } )
            );
}

}
