jQuery(document).ready(function() {
    jQuery('.form-wizard-next-btn').click(function() {
        var parentFieldset = jQuery(this).parents('.wizard-fieldset');
        var currentActiveStep = jQuery(this).parents('.form-wizard').find('.form-wizard-steps .active');
        var next = jQuery(this);
        var nextWizardStep = true;
        parentFieldset.find('.wizard-required').each(function(i, vule){
            var thisValue = jQuery(this).val();
            if( thisValue == "") {
                jQuery(this).siblings(".wizard-form-error").slideDown();
                nextWizardStep = false;
            }else if(!(/^\d{10}$/.test($('#mobile').val()))){
                jQuery($('#mobile')).siblings(".wizard-form-error").slideDown();
                nextWizardStep = false;
            }else if(!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test($('#email').val()))){
                jQuery($('#email')).siblings(".wizard-form-error").slideDown();
                nextWizardStep = false;
            }
            else {
                jQuery(this).siblings(".wizard-form-error").slideUp();
            }
        });
        if( nextWizardStep) {
            next.parents('.wizard-fieldset').removeClass("show","400");
            currentActiveStep.removeClass('active').addClass('activated').next().addClass('active',"400");
            next.parents('.wizard-fieldset').next('.wizard-fieldset').addClass("show","400");
            jQuery(document).find('.wizard-fieldset').each(function(){
                if(jQuery(this).hasClass('show')){
                    var formAtrr = jQuery(this).attr('data-tab-content');
                    jQuery(document).find('.form-wizard-steps .form-wizard-step-item').each(function(){
                        if(jQuery(this).attr('data-attr') == formAtrr){
                            jQuery(this).addClass('active');
                            var innerWidth = jQuery(this).innerWidth();
                            var position = jQuery(this).position();
                            jQuery(document).find('.form-wizard-step-move').css({"left": position.left, "width": innerWidth});
                        }else{
                            jQuery(this).removeClass('active');
                        }
                    });
                }
            });
        }
    });
    //click on previous button
    jQuery('.form-wizard-previous-btn').click(function() {
        var counter = parseInt(jQuery(".wizard-counter").text());;
        var prev =jQuery(this);
        var currentActiveStep = jQuery(this).parents('.form-wizard').find('.form-wizard-steps .active');
        prev.parents('.wizard-fieldset').removeClass("show","400");
        prev.parents('.wizard-fieldset').prev('.wizard-fieldset').addClass("show","400");
        currentActiveStep.removeClass('active').prev().removeClass('activated').addClass('active',"400");
        jQuery(document).find('.wizard-fieldset').each(function(){
            if(jQuery(this).hasClass('show')){
                var formAtrr = jQuery(this).attr('data-tab-content');
                jQuery(document).find('.form-wizard-steps .form-wizard-step-item').each(function(){
                    if(jQuery(this).attr('data-attr') == formAtrr){
                        jQuery(this).addClass('active');
                        var innerWidth = jQuery(this).innerWidth();
                        var position = jQuery(this).position();
                        jQuery(document).find('.form-wizard-step-move').css({"left": position.left, "width": innerWidth});
                    }else{
                        jQuery(this).removeClass('active');
                    }
                });
            }
        });
    });
    //click on form submit button
    jQuery(document).on("click",".form-wizard .form-wizard-submit" , function(){
        var parentFieldset = jQuery(this).parents('.wizard-fieldset');
        var currentActiveStep = jQuery(this).parents('.form-wizard').find('.form-wizard-steps .active');
        parentFieldset.find('.wizard-required').each(function() {
            var thisValue = jQuery(this).val();
            if( thisValue == "" ) {
                jQuery(this).siblings(".wizard-form-error").slideDown();
            }
            else {
                jQuery(this).siblings(".wizard-form-error").slideUp();
            }
        });
        parentFieldset.find('.wizard-requiredrb').each(function(){
            if($('input[type="radio"]').prop('checked')==false) {
                jQuery(this).siblings(".wizard-form-error").slideDown();
                nextWizardStep = false;
            }
            else {
                jQuery(this).siblings(".wizard-form-error").slideUp();
                getFormData()
            }
        });
    });
    // focus on input field check empty or not
    jQuery(".form-control").on('focus', function(){
        var tmpThis = jQuery(this).val();
        if(tmpThis == '' ) {
            jQuery(this).parent().addClass("focus-input");
        }
        else if(tmpThis !='' ){
            jQuery(this).parent().addClass("focus-input");
        }
    }).on('blur', function(){
        var tmpThis = jQuery(this).val();
        if(tmpThis == '' ) {
            jQuery(this).parent().removeClass("focus-input");
            jQuery(this).siblings('.wizard-form-error').slideDown("3000");
        }
        else if(tmpThis !='' ){
            jQuery(this).parent().addClass("focus-input");
            jQuery(this).siblings('.wizard-form-error').slideUp("3000");
        }
    });
});
$('#policy').change(function() {
    const seletedOption = $(this).find(":selected").val()
    
    $('.gotothird').toggle()
    $('.gotothird-step').toggle()
    
    if(seletedOption==='Individual'){
        $('#adults').hide()
        $('#chidren').hide()
        // $('.gotothird').show()
    }else if(seletedOption==='Family'){
        $('#adults').show()
        $('#chidren').show()
        // $('.gotothird').hide()
    }
})
$('#adults').change(function(){
    const seletedOption = $(this).find(":selected").val()
    if(seletedOption!='adults'){
        displayMemberRow('Adult', seletedOption)
    }
})
$('#chidren').change(function(){
    const seletedOption = $(this).find(":selected").val()
    if(seletedOption!='chidren'){
        displayMemberRow('Chidren', seletedOption)
    }
})

function displayMemberRow(memberType, numberofMember){
    var option='<option value>Age</option>'
    for(i=1;i<100;i++){
        option +='<option value='+i+'>'+i+'</option>';
    }
    let idtype;
    if(memberType==='Adult'){
        idtype = 'adults'
        $("#adults-rows").empty()
    }else{
        idtype = 'childs'
        $("#childs-rows").empty()
    }
    for( i  = 1 ; i<=numberofMember ; i++){
        $("#"+idtype+"-rows").append("<div class='fild-row member-row' id='"+idtype+"-row"+i+"'> <div class='form-group lthf text-black'> "+ ordinal_suffix_of(i)+" "+memberType+" Details</div> <div class='form-group lths'> <div class='wizard-form-radio '> <input id='radio1"+idtype+i+"' name='radio-name-"+idtype+i+"' type='radio' class='wizard-required' checked> <label class='member-gender border-first' for='radio1"+idtype+i+"'>Male</label> <div class='wizard-form-error'></div> </div> <div class='wizard-form-radio gap-m'> <input name='radio-name-"+idtype+i+"' id='radio2"+idtype+i+"' type='radio' class='wizard-required'> <label class='member-gender border-second' for='radio2"+idtype+i+"'>Female</label> <div class='wizard-form-error'></div> </div> </div> <div class='form-group ltht'> <select  id='age"+idtype+i+"' class='form-control wizard-required age-arr' > "+option+"  </select> <div class='wizard-form-error'></div> </div> <div class='clear'></div> </div>");
        $('#age'+idtype+i).change(function(){
            // console.log(this)
        })
    }

    
    function ordinal_suffix_of(i) {
        var j = i % 10,
            k = i % 100;
        if (j == 1 && k != 11) {
            return i + "<sup> st</sup>";
        }
        if (j == 2 && k != 12) {
            return i + "<sup>nd</sup>";
        }
        if (j == 3 && k != 13) {
            return i + "<sup>rd</sup>";
        }
        return i + "<sup>th</sup>";
    }
}
function getFormData(){
    // console.log("getFormData")
    var $inputs = $('#paybhima-health :input');
    $inputs.each(function() {
        values[this.name] = $(this).val();
    });
    // console.log($inputs)
    // console.log(values)
}