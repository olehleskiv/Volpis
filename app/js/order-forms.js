
(function(){
var hiddenAttachButton = getId('h-attach-button');
var mainAttachButton = getId('attach-button');

var hiddenAttachBlock = getId('h-attach-block');
var mainAttachBlock = getId('attach-block');

var hiddenCancelButton = getId('h-attach-cancel');
var mainCancelButton = getId('attach-cancel');

var hiddenOkButton = getId('h-attach-ok');
var mainOkButton = getId('attach-ok');

var hiddenFileInput = getId('h-file');
var mainFileInput = getId('file');

function getId(id){
	return document.getElementById(id);
}


function addToogleEvent(attachButtonID, attachBlockID){
	attachButtonID.addEventListener('click', function(e){
	e.preventDefault();
	toggleBox(attachBlockID);
	});

	function toggleBox(attachBlockID){
		var box = attachBlockID;
		var display = box.style.display;
		if (display == 'none'){
			box.style.display = 'block';
		} else {
			box.style.display = 'none';
		}
	}
}


function cancelAttach(cancelButton, fileInputID, attachBlockID){
	cancelButton.addEventListener('click', function(e){
	e.preventDefault();
	fileInputID.value = '';
	attachBlockID.style.display = 'none';
	});
}


function submitAttach(okButton, attachBlockID){
	okButton.addEventListener('click', function(e){
	e.preventDefault();
	attachBlockID.style.display = 'none';
	});
}


addToogleEvent(hiddenAttachButton, hiddenAttachBlock);
addToogleEvent(mainAttachButton, mainAttachBlock);

submitAttach(hiddenOkButton, hiddenAttachBlock);
submitAttach(mainOkButton, mainAttachBlock);

cancelAttach(hiddenCancelButton, hiddenFileInput, hiddenAttachBlock);
cancelAttach(mainCancelButton, mainFileInput, mainAttachBlock);

})();


	
// helper function to place modal window as the first child
// of the #page node
var m = document.getElementById('modal_window'),
    p = document.getElementById('page');

function swap() {
  p.parentNode.insertBefore(m, p);
}

swap();


// modal window
(function() {

  // list out the vars
  var mOverlay = getId('modal_window'),
      mOpen = getId('modal_open'),
      mClose = getId('modal_close'),
      modal = getId('modal_holder'),
      allNodes = document.querySelectorAll("*"),
      modalOpen = false,
      lastFocus,
      i;


  // Let's cut down on what we need to type to get an ID
  function getId ( id ) {
    return document.getElementById(id);
  }


  // Let's open the modal
  function modalShow () {
    lastFocus = document.activeElement;
    mOverlay.setAttribute('aria-hidden', 'false');
    modalOpen = true;
    modal.setAttribute('tabindex', '0');
    modal.focus();
  }


  // binds to both the button click and the escape key to close the modal window
  // but only if modalOpen is set to true
  function modalClose ( event ) {
    if (modalOpen && ( !event.keyCode || event.keyCode === 27 ) ) {
      mOverlay.setAttribute('aria-hidden', 'true');
      modal.setAttribute('tabindex', '-1');
      modalOpen = false;
      lastFocus.focus();
    }
  }


  // Restrict focus to the modal window when it's open.
  // Tabbing will just loop through the whole modal.
  // Shift + Tab will allow backup to the top of the modal,
  // and then stop.
  function focusRestrict ( event ) {
    if ( modalOpen && !modal.contains( event.target ) ) {
      event.stopPropagation();
      modal.focus();
    }
  }


  // Close modal window by clicking on the overlay
  mOverlay.addEventListener('click', function( e ) {
    if (e.target == modal.parentNode) {
       modalClose( e );
     }
  }, false);


  // open modal by btn click/hit
  mOpen.addEventListener('click', modalShow);

  // close modal by btn click/hit
  mClose.addEventListener('click', modalClose);

  // close modal by keydown, but only if modal is open
  document.addEventListener('keydown', modalClose);

  // restrict tab focus on elements only inside modal window
  for (i = 0; i < allNodes.length; i++) {
    allNodes.item(i).addEventListener('focus', focusRestrict);
  }



  function sendEmail(buttonID, formID){
  $(buttonID).click(function(e){
    e.preventDefault();
    var formData = new FormData($(formID)[0]); 

    $.ajax({
      type: "POST",
      processData: false,
      contentType: false,
      url: 'mail-attachment.php', 
      data: formData,
      beforeSend: function(data) {
        $(buttonID).attr('disabled', 'disabled');
        $(buttonID).val('Виконується надсилання...');
      },
      success: function(result) {
        if (buttonID == '#h-submit'){
          $('#modal_close').click();
        }
        $('#success-text').css('display', 'block');
        setTimeout(function(){
          $('#success-text').css('display', 'none');
        }, 3000);
        // $('#formmail').remove();
        // $('#success').html(result);
      },
      error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status); 
          alert(thrownError); 
      },
      complete: function(data) {
          $(buttonID).prop('disabled', false);
          $(buttonID).val('Замовити розробку');

      }
    });
  });
}



sendEmail('#h-submit', '#hidden-form');
sendEmail('#submit', '#main-form');

})();
