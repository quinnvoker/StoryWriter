$(() => {

  const $main = $('#main-content');

  window.views_manager = {
    show(item) {
      $test_1.detach();
      $test_2.detach();
      $home.detach();

      switch (item) {
        case 'test_1':
          $test_1.appendTo($main);
          break;
        case 'test_2':
          $test_2.appendTo($main);
          break;
        case 'home':
          $home.appendTo($main);
          break;
      };
    }
  };
});
