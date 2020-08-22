$(() => {

  const $test_1 = $(`
    <button>Test 1</button>
  `);

  window.$test_1 = $test_1;

  $test_1.click((event) => {
    views_manager.show('test_2');
  });

});
