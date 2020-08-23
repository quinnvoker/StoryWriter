$(() => {

  const $test_2 = $(`
    <button>Test 2</button>
  `);

  window.$test_2 = $test_2;

  $test_2.click((event) => {
    views_manager.show('test_1');
  });

});
