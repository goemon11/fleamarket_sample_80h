$(document).on('turbolinks:load', ()=> {
  const buildImg = (index, url) => {
    const html = `<img data-index="${index}" src="${url}" width="100px" height="100px">`;
    return html;
  }

  const buildFileField = (index) =>{
    const html = `<div class="js-file_group" data-index="${index}">
                    <input class="js-file" type="file" name="item[item_iamges][${index}][image]" id = "item_item_iamges_${index}_image"><br>
                    <div class="js-remove">削除</div>
                  </div>`;
    return html;
  }
  let fileIndex = [1,2,3,4,5,6,7,8,9,10];


  lastIndex = $('.js-file_group:last').data('index');
  fileIndex.splice(0, lastIndex);
  $('.hidden-destroy').hide();

  $('#image-box').on('change', '.js-file', function(e) {
    const targetIndex = $(this).parent().data('index');
    const file = e.target.files[0]
    const blobUrl = window.URL.createObjectURL(file);
    if (img = $(`img[data-index = "${targetIndex}"]`)[0]) {
      img.setAttribute('src', blobUrl);
    } else {
      $('#previews').append(buildImg(targetIndex, blobUrl));
      $('#image-box').append(buildFileField(fileIndex[0]));
      fileIndex.shift();
      fileIndex.push(fileIndex[fileIndex.length - 1] + 1);
    }
  });


  $('#image-box').on('click', '.js-remove', function() {
    $(this).parent().remove();
    const targetIndex = $(this).parent().data('index')
    const hiddenCheck = $(`input[data-index = "${targetIndex}"].hidden-destroy`)
    if ($('.js-file').length == 0) $('#image-box').append(buildFileField(fileIndex[0]));
    if (hiddenCheck) hiddenCheck.prop('checked', true);
    $(`img[data-index= "${targetIndex}"]`).remove();
  });

});