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
      this.setDateRanges();
      this.loadDependencies().done(function(){
        _this.buildInstances();
      });
    },

    // Set date ranges immediately before we load moment.js or other dependencies
    setDateRanges : function(){
      var start = new Date(),
          end = new Date();

      end.setDate(end.getDate() + 1);
      start = [start.getMonth()+1, start.getDate(), start.getFullYear()].join("/");
      end = [end.getMonth()+1, end.getDate(), end.getFullYear()].join("/");

      $('.bookingForm input[name=range]').val(start + " - " + end);
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
      var $parent = $(parent);

      // Position even with input on portrait version
      if($parent.hasClass('long')){
        var left = $parent.find('[name=range]').offset().left - $parent.offset().left;
        $parent.find('.bookingCalendar').css({left: left});
      }else{
        var top = $parent.find('[name=range]').offset().top - $parent.offset().top;
        $parent.find('.bookingCalendar').css({top: top});
      }

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
        startDate: moment().toDate(),
        endDate: moment().add(500, 'day').toDate(),
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
