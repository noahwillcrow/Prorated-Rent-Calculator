$(function() {
    var $addRenterButton = $("#btnAddRenter");
    var $calculateButton = $("#btnCalculate");
    var $costOfRent = $("#txtCostOfRent");
    var $daysInMonth = $("#txtDaysInMonth");
    var $renterRowsArea = $("#renters");
    var $renterRowTemplate = $(".template.renterRow");
    var $results = $("#results");

    function getRentersData() {
        var rentersData = [];

        var $renters = $(".renterRow:not(.template)");
        $renters.each(function(i) {
            var $this = $(this);
            var $name = $this.find("input[name='txtName']");
            var $startDay = $this.find("input[name='txtStartDay']");
            var $endDay = $this.find("input[name='txtEndDay']");

            var renterData = { 
                name: $name.val(),
                startDay: parseInt($startDay.val()),
                endDay: parseInt($endDay.val()),
                totalRent: 0.0,
                totalDays: 0
            };
            rentersData.push(renterData);
        });

        return rentersData;
    }

    $addRenterButton.click(function() {
        var $renterRow = $renterRowTemplate.clone();
        $renterRow.removeClass("template");
        $renterRow.appendTo($renterRowsArea);
    });

    $calculateButton.click(function() {
        var costOfRent = parseFloat($costOfRent.val());
        var daysInMonth = parseInt($daysInMonth.val());
        var dailyRentTotal = costOfRent / daysInMonth;

        var rentersData = getRentersData();

        for (var day = 1; day <= daysInMonth; day++) {
            var activeRenters = [];

            for (var i = 0; i < rentersData.length; i++) {
                var renterData = rentersData[i];
                if (day >= renterData.startDay && day <= renterData.endDay) {
                    renterData.totalDays++;
                    activeRenters.push(renterData);
                }
            }

            var rentPerPerson = dailyRentTotal / activeRenters.length;
            for (var i = 0; i < activeRenters.length; i++) {
                activeRenters[i].totalRent += rentPerPerson;
            }
        }

        var combinedRentSum = 0.0;

        $results.empty();
        for (var i = 0; i < rentersData.length; i++) {
            var renterData = rentersData[i];

            combinedRentSum += renterData.totalRent;

            var totalRentString = "$" + parseFloat(Math.ceil(renterData.totalRent * 100) / 100).toFixed(2);

            $results.append(renterData.name + " - Days: " + renterData.totalDays + " | Rent: " + totalRentString + "<br />");
        }

        var combinedRentSumString = "$" + parseFloat(Math.ceil(combinedRentSum * 100) / 100).toFixed(2);
        $results.append("<br />Total of all rent put together: " + combinedRentSumString);
    });
});