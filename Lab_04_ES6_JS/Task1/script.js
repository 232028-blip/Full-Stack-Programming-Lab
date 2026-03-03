/* ============================================================
   script.js  —  Dynamic List Manager
   Features: DOM Manipulation | Event Handling | CSS Manipulation
             jQuery | AJAX
   ============================================================ */

$(document).ready(function () {

  /* ──────────────────────────────────────────
     State
  ────────────────────────────────────────── */
  let itemCount = 0;   // running total (used as unique IDs)

  /* ──────────────────────────────────────────
     updateUI
     Refreshes counter, Clear All button, and
     the empty-state panel after every change.
  ────────────────────────────────────────── */
  function updateUI() {
    var count = $('#itemList .list-item').length;

    // DOM Manipulation: update counter text
    $('#itemCount').text(count === 1 ? '1 item' : count + ' items');

    // Show / hide "Clear All" button
    if (count > 0) {
      $('#clearAllBtn').removeClass('hidden');
    } else {
      $('#clearAllBtn').addClass('hidden');
    }

    // Show / hide empty state
    if (count === 0) {
      $('#emptyState').show();
    } else {
      $('#emptyState').hide();
    }

    // Re-number every badge after add/delete
    $('#itemList .list-item').each(function (index) {
      $(this).find('.item-num').text(index + 1);
    });
  }

  /* ──────────────────────────────────────────
     createListItem
     Builds a <li> entirely with jQuery DOM
     methods — no innerHTML, no template strings.
  ────────────────────────────────────────── */
  function createListItem(text, id) {
    // Outer <li>
    var $li = $('<li>', {
      'class':    'list-item',
      'data-id':  id
    });

    // Number badge
    var $num = $('<span>', {
      'class': 'item-num',
      'text':  id
    });

    // Item text
    var $txt = $('<span>', {
      'class': 'item-text',
      'text':  text
    });

    // Small accent dot (pure decoration)
    var $dot = $('<span>', { 'class': 'item-dot' });

    // Delete button
    var $del = $('<button>', {
      'class': 'btn-delete',
      'title': 'Delete this item',
      'html':  '&times;'
    });

    // Assemble — DOM Manipulation: append children
    $li.append($num, $txt, $dot, $del);
    return $li;
  }

  /* ──────────────────────────────────────────
     addItem
     Core logic called by button click and Enter.
  ────────────────────────────────────────── */
  function addItem() {
    var text = $.trim($('#itemInput').val());   // jQuery utility: trim whitespace

    // Validation
    if (text === '') {
      // CSS Manipulation: show error via class toggle
      $('#errorMsg').removeClass('hidden');

      // Auto-dismiss after 2.5 s
      setTimeout(function () {
        $('#errorMsg').addClass('hidden');
      }, 2500);

      $('#itemInput').focus();
      return;
    }

    // Clear error if visible
    $('#errorMsg').addClass('hidden');

    // Increment counter and build item
    itemCount++;
    var $newItem = createListItem(text, itemCount);

    // DOM Manipulation: append to list
    $('#itemList').append($newItem);

    // Reset input
    $('#itemInput').val('').focus();

    // Sync UI
    updateUI();
  }

  /* ──────────────────────────────────────────
     Event Handling — Add button click
  ────────────────────────────────────────── */
  $('#addBtn').on('click', function () {
    addItem();
  });

  /* ──────────────────────────────────────────
     Event Handling — Enter key on input
  ────────────────────────────────────────── */
  $('#itemInput').on('keypress', function (e) {
    if (e.which === 13) {
      addItem();
    }
  });

  /* ──────────────────────────────────────────
     Event Handling — Delete button
     Uses event delegation so dynamically added
     buttons are always captured.
  ────────────────────────────────────────── */
  $('#itemList').on('click', '.btn-delete', function () {
    var $item = $(this).closest('.list-item');

    // CSS Manipulation: add class to start slide-out animation
    $item.addClass('removing');

    // DOM Manipulation: remove node after animation finishes
    setTimeout(function () {
      $item.remove();
      updateUI();
    }, 220);
  });

  /* ──────────────────────────────────────────
     CSS Manipulation via jQuery .css()
     Applies inline hover styles on dynamic items
     (event delegation required).
  ────────────────────────────────────────── */
  $('#itemList').on('mouseenter', '.list-item', function () {
    // Direct CSS property change via jQuery
    $(this).css('background-color', '#fdf0eb');
    $(this).find('.item-dot').css('background-color', '#e8673a');
  });

  $('#itemList').on('mouseleave', '.list-item', function () {
    // Revert inline styles so CSS rules take over
    $(this).css('background-color', '');
    $(this).find('.item-dot').css('background-color', '');
  });

  /* ──────────────────────────────────────────
     Clear All
  ────────────────────────────────────────── */
  $('#clearAllBtn').on('click', function () {
    // Trigger removal animation on all items at once
    $('#itemList .list-item').addClass('removing');

    setTimeout(function () {
      // DOM Manipulation: empty the entire list
      $('#itemList').empty();
      updateUI();
    }, 240);
  });

  /* ──────────────────────────────────────────
     AJAX — POST list to mock REST API
     Swap the URL for a real endpoint to go live.
  ────────────────────────────────────────── */
  function saveListAjax() {
    // Collect all item texts into an array
    var items = $('#itemList .item-text').map(function () {
      return $(this).text();
    }).get();

    if (items.length === 0) { return; }

    $.ajax({
      url:         'https://jsonplaceholder.typicode.com/posts',
      method:      'POST',
      contentType: 'application/json',
      data:        JSON.stringify({ title: 'My List', items: items }),
      success: function (response) {
        console.log('[AJAX] List saved successfully:', response);
      },
      error: function (xhr, status, err) {
        console.warn('[AJAX] Save failed (demo mode):', status, err);
      }
    });
  }

  // Debounced save — fires 800 ms after the last list change
  var saveTimer;
  function debounceSave() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveListAjax, 800);
  }

  $('#addBtn').on('click', debounceSave);
  $('#itemList').on('click', '.btn-delete', debounceSave);
  $('#clearAllBtn').on('click', debounceSave);

  /* ──────────────────────────────────────────
     Initialise
  ────────────────────────────────────────── */
  updateUI();

});