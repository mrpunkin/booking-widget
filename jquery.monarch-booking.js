var MonarchBooking;
(function($){
  MonarchBooking = {
    options: {
      dateFormat: 'M/D/YYYY'
    },
    dependencies: {
      css: [
        'daterangepicker.min.css',
        'widget.css',
        'https://fonts.googleapis.com/icon?family=Material+Icons'
      ],
      js: [
        'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.21.0/moment.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/jquery-date-range-picker/0.16.1/jquery.daterangepicker.min.js'
      ]
    },

    init : function(options){
      var _this = this;
      $.extend(this.options, options || {});
      this.loadDependencies().done(function(){
        _this.setupPicker();
      });
    },

    loadDependencies : function(){
      $.each(this.dependencies.css, function(i, href){
        $('<link>')
          .appendTo('head')
          .attr({
            type: 'text/css',
            rel: 'stylesheet',
            href: href
          });
      });

      var chain = $.when();
      $.each(this.dependencies.js, function(i, src){
        chain = chain.then(function(){
          return $.getScript(src);
        });
      });
      return chain;
    },

    setupPicker : function(){
      $('#bookingRange').dateRangePicker({
        inline: true,
        container: '.bookingForm .bookingCalendar',
        autoClose: true,
        format: this.options.dateFormat,
        separator: ' - ',
        showTopbar: false,
        monthSelect: true,
        yearSelect: true,
        minDays: 2,
        startDate: moment().add(1, 'day').format(this.options.dateFormat),
        endDate: moment().add(500, 'day').format(this.options.dateFormat),
        customArrowPrevSymbol: '<i class="material-icons">arrow_back</i>',
        customArrowNextSymbol: '<i class="material-icons">arrow_forward</i>',
        setValue: function(range){
          var dates = range.split(" - "),
              start = dates[0].trim(),
              end = dates[1].trim();
          $('#bookingRange').val(range);
          $('#bookingArrive').val(start);
          $('#bookingDepart').val(end);
        },
        hoveringTooltip: function(days, startTime, hoveringTime){
          var nights = days - 1;
          return nights + (nights == 1 ? ' night' : ' nights');
        }
      });
    }
  }
}(jQuery));
(function($){
  $(document).ready(function(){
    MonarchBooking.init();
  });
}(jQuery));
