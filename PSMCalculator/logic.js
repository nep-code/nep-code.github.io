const PSMCalculator = (function() {

    let container               = document.getElementById("container"),
        i_share                 = document.getElementById("i_share"),
        i_buyprice              = document.getElementById("i_buyprice"),
        i_sellprice             = document.getElementById("i_sellprice"),
        o_totalamountpaid       = document.getElementById("o_totalamountpaid"),
        o_totalamountreceived   = document.getElementById("o_totalamountreceived"),
        o_gainlost              = document.getElementById("o_gainlost"),

        totalamountpaid         = 0,
        totalamountreceived     = 0,
        totalbuyfee             = 0,
        totalsellfee            = 0,
        totalgainlost           = 0,

    format = function(n) {
        return new Intl.NumberFormat().format(n)
    },

    init = function() {
        gsap.set(container, {autoAlpha:1, pointerEvents:'auto'});
        addEventListeners();
        console.log("success");
    }

    addEventListeners = function() {
        window.addEventListener('resize', autoScale);

        i_share.addEventListener('input', calculate);
        i_buyprice.addEventListener('input', calculate);
        i_sellprice.addEventListener('input', calculate);
        //btn_close.addEventListener('click', CLICK_BTN);
        autoScale();
    };

    function calculate () {
        calculate_buy();
        if(i_share.value && i_buyprice.value && i_sellprice.value) calculate_sell();
    };
    
    function calculate_buy() {
        let share           = i_share.value,
            buyprice        = i_buyprice.value,
            totalamount     = share * buyprice,
            brokersfee      = totalamount * 0.0025,
            VATcom          = brokersfee * 0.12,
            PSEfee          = totalamount * 0.00005,
            SCCPfee         = totalamount * 0.0001;

        if(brokersfee < 20) brokersfee = 20;

        totalbuyfee = brokersfee + VATcom + PSEfee + SCCPfee;
        totalamountpaid = totalamount + totalbuyfee;

        if(i_share.value && i_buyprice.value) o_totalamountpaid.innerHTML = "₱ " + format(totalamountpaid);
    };

    function calculate_sell() {
        let share           = i_share.value,
            sellprice       = i_sellprice.value,
            totalamount     = share * sellprice,
            brokersfee      = totalamount * 0.0025,
            VATcom          = brokersfee * 0.12,
            PSEfee          = totalamount * 0.00005,
            SCCPfee         = totalamount * 0.0001,
            salestax        = totalamount * 0.006;

        if(brokersfee < 20) brokersfee = 20;

        totalsellfee        = brokersfee + VATcom + PSEfee + SCCPfee + salestax;
        totalamountreceived = totalamount - totalsellfee;
        totalgainlost       = totalamountreceived - totalamountpaid;

        o_totalamountreceived.innerHTML = "₱ " + format(totalamountreceived);
        
        update_gainlost();
    };

    function update_gainlost () {        
        o_gainlost.innerHTML = "₱ " + format(totalgainlost);

        if(totalgainlost < 0 ) o_gainlost.style.color = "#ff3333";
        else o_gainlost.style.color = "#00ff48";
    };

    function autoScale () {
        let window_w    = window.innerWidth,
            window_h    = window.innerHeight,
            container_w = container.offsetWidth,
            container_h = container.offsetHeight,
            scale_w     = Math.abs(window_w / container_w),
            scale_h     = Math.abs(window_h / container_h);
        if(window_w > window_h) { gsap.set(container, {scale:scale_h}); }
        else {
            if(container_w > window_w) gsap.set(container, {scale:scale_h});
            else gsap.set(container, {scale:scale_w});
        }
    };

    return {
        init : init
	};

})();

window.addEventListener("load", PSMCalculator.init);