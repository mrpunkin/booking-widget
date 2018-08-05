var MonarchBooking;
(function($){
  MonarchBooking = {
    options: {
      dateFormat: 'M/D/YYYY'
    },
    dependencies: {
      js: [
        'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.21.0/moment.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/jquery-date-range-picker/0.16.1/jquery.daterangepicker.min.js'
      ]
    },
    instances: [],

    init : function(options){
      var _this = this;
      $.extend(this.options, options || {});
      this.loadDependencies().done(function(){
        _this.buildInstances();
      });
    },

    loadDependencies : function(){
      var chain = $.when();
      $.each(this.dependencies.js, function(i, src){
        chain = chain.then(function(){
          return $.getScript(src);
        });
      });
      return chain;
    },

    buildInstances : function(){
      this.instances = $('.bookingForm');
      var _this = this;
      $.each(this.instances, function(i,el){
        _this.setupPicker(el);
      });
    },

    setupPicker : function(parent){
      $parent = $(parent);
      $parent.find('[name=range]').dateRangePicker({
        inline: true,
        container: $parent.find('.bookingCalendar'),
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
          $parent.find('[name=range]').val(range);
          $parent.find('[name=arrive]').val(start);
          $parent.find('[name=depart]').val(end);
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
