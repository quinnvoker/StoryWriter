$(() => {

  //append a unique id to each story
  //maybe each <figure> will have an id story-1
  const $my_stories = $(`
  <div class="content stories">
      <!-- Grid row -->
      <div class="grid">
       <h2 class="tagline"> One. Story. <span class="highlight">At. A. Time</span></h2>
       <figure id="story-1" class="effect-sadie">
         <img src="https://www.estliving.com/wp-content/uploads/2017/05/est-living-interiors-pinterest-home-10.jpg" alt="img01"/>
         <figcaption>
           <h2>Nice <span>Lily</span></h2>
           <p>Lily likes to play with crayons and pencils</p>
           <a href="#">View more</a>
         </figcaption>
       </figure>
       <figure class="effect-sadie">
         <img src="https://www.estliving.com/wp-content/uploads/2017/05/est-living-interiors-pinterest-home-10.jpg" alt="img01"/>
         <figcaption>
           <h2>Nice <span>Lily</span></h2>
           <p>Lily likes to play with crayons and pencils</p>
           <a href="#">View more</a>
         </figcaption>
       </figure>
     </div>
     <div class="grid">
       <figure class="effect-sadie">
         <img src="https://www.estliving.com/wp-content/uploads/2017/05/est-living-interiors-pinterest-home-10.jpg" alt="img01"/>
         <figcaption>
           <h2>Nice <span>Lily</span></h2>
           <p>Lily likes to play with crayons and pencils</p>
           <a href="#">View more</a>
         </figcaption>
       </figure>
       <figure class="effect-sadie">
         <img src="https://www.estliving.com/wp-content/uploads/2017/05/est-living-interiors-pinterest-home-10.jpg" alt="img01"/>
         <figcaption>
           <h2>Nice <span>Lily</span></h2>
           <p>Lily likes to play with crayons and pencils</p>
           <a href="#">View more</a>
         </figcaption>
       </figure>
     </div>

  </div>
  `);

  window.$my_stories = $my_stories;
  $('#my-stories').on('click',function() {
    $('header').hide();
    views_manager.show('my_stories');
  });

  $('#story-1').on('click',function(evt) {
    // evt.preventDefautl();
    alert("clicked");
    // $('header').hide();
    // console.log("from story 1");
   views_manager.show('story');
  });



});


