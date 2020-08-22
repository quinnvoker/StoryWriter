$(() => {

  const $main = $('#main-content');

  window.views_manager = {
    show(item) {
      $test_heading.detach();
      $test_paragraph.detach();

      switch (item) {
        case 'test_heading':
          $test_heading.appendTo($main);
          break;
        case 'test_paragraph':
          $test_paragraph.appendTo($main);
          break;
      };
    }
  };
});
