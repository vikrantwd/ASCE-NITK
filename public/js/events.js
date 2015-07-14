  var year = moment().year();
  var currentMonth = moment().format('YYYY-MM');
  var nextMonth    = moment().add(1,'months').format('YYYY-MM');
 
  var events = [
    { date: currentMonth + '-' + '10', title: 'Persian Kitten Auction', location: 'Center for Beautiful Cats' },
    { date: currentMonth + '-' + '19', title: 'Cat Frisbee', location: 'Jefferson Park' },
    { date: currentMonth + '-' + '10', title: 'Persian Kitten Auction', location: 'Center for Beautiful Cats' },
    { date: currentMonth + '-' + '19', title: 'Cat Frisbee', location: 'Jefferson Park' },
    { date: currentMonth + '-' + '23', title: 'Kitten Demonstration', location: 'Center for Beautiful Cats' },
    { date: currentMonth + '-' + '23', title: 'Kitten Demonstration', location: 'Center for Beautiful Cats' },
    { date: nextMonth + '-' + '07',    title: 'Small Cat Photo Session', location: 'Center for Cat Photography' },
    { date: '2015-10' + '-' + '13',    title: 'Arpan BIrthaday', location: 'Center for Cat Photography' }
  ];

jQuery(document).ready(function($) {
  $('#mini-clndr').clndr({
    template: $('#calendar-template').html(),
    events: events,
    constraints: {
              startDate: moment(year + '-01-01'),
              endDate: moment(year + '-12-31')
             },
    clickEvents: {
      click: function(target) {

         if(target.events.length) {

             var daysContainer = $('#mini-clndr').find('.days-container');
             daysContainer.toggleClass('show-events', true);
             $('#mini-clndr').find('.x-button').click( function() {
               daysContainer.toggleClass('show-events', false);
             });
           }
      }
    },
    adjacentDaysChangeMonth: true
  });
});