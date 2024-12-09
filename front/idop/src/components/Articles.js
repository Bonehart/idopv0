
import React, {useContext}  from 'react';
import ReactDOM from 'react-dom';
import { PageContext } from '../PageContext.js';
import '../css/articles.css';

export const Articles = props => {

    return (

<> 
       
      <div class="gallery">

   {props.articlesdata.map( 
        (post) =>  (             
        <div class="gallery-item"  onClick={() => { props.setdetailed(true);  props.setcurrentpost(post) ;}}>
          <div class="article-heading">    {post.displayName}</div> 
 
     
          <img alt="gallery-post" src={"/Images/" +  post.image } />
          <div class="text-overlay">  <p>{post.activity}</p>    </div> 
          
          </div>
        )
      )}   

      </div>
      


          
       

      </>
    )
}

export default Articles;