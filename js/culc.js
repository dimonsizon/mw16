(function ($) {  

    
    calc(10000);

})(jQuery);
function calc(value) {
    var pushToArray = function (text, contributionSum, contributionIncome, allContributionProfit, allContributionSum) {
        contributions.push({
            "text": text,
            "contributionSum": contributionSum,
            "contributionIncome": contributionIncome,
            "allContributionProfit": allContributionProfit,
            "allContributionSum": allContributionSum,
        });
    }
    var startSumm = parseInt(value); //parseInt($('#startSumm').val());//10000;
    var monthCount = 24;
    var contributions = [];
    for (i = 1; i <= monthCount; i++) {
        var text = '';
        var contributionSum = 0;
        var contributionIncome = 0;
        var allContributionProfit = 0;
        var allContributionSum = 0;

        //for text
        if (i == 2 || i == 3 || i == 4) {
            text = 'Через ' + i + ' месяцa';
        }
        if (i > 4 && i <=12) {
            text = 'Через ' + i + ' месяцев';
        }
        if (i > 12 && i <= 24) {
            text = (i - 12) + ' месяц 2го года';
        }

        if (i == 1) { //first month
            text = 'Через ' + i + ' месяц';
            contributionSum = startSumm;
            contributionIncome = startSumm * 0.26;
            allContributionSum = startSumm + contributionSum;
        } else if (i <= 12) { //for 1 year
            contributionSum = startSumm;
            contributionIncome = contributions[i - 2].allContributionSum * 0.26;
            allContributionSum = contributions[i - 2].allContributionSum + contributionSum;
        } else { //after 1 year
            contributionSum = startSumm;
            contributionIncome = contributions[i - 2].allContributionSum * 0.26;
            allContributionSum = contributions[i - 2].allContributionSum + contributionSum - startSumm;
        }
        allContributionProfit = contributionIncome - contributionSum;

        pushToArray(text, contributionSum, contributionIncome, allContributionProfit, allContributionSum);
    }

    function renderTable() {
        var table = $('#contributionsTable tbody');
        table.html('');
        for (var i = 0; i < contributions.length; i++) {
            table.append('<tr>' +
                        '<td>' + contributions[i].text + '</td>' +
                        '<td>' + contributions[i].contributionSum + '</td>' +
                        '<td>' + contributions[i].contributionIncome + '</td>' +
                        '<td>' + contributions[i].allContributionProfit + '</td>' +
                        '<td>' + contributions[i].allContributionSum + '</td>' +
                        '</tr>');
        }
    }
    renderTable();
}