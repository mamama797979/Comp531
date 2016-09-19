//Initialize when the page is loaded.
window.onload = function(){
    var mainBtn = document.getElementById("mainPageBtn")
    var properties = document.getElementsByClassName('property');
    mainBtn.onclick = function() {
        window.location = "main.html"
    }
    for(var i = 0; i < properties.length; i++){
        (function(item){
            propertyTable[item.id] = new Property(item.id, item.children[2].innerHTML);
        })(properties[i])
    }
}

//Constructor to manage the property updation.
function Property(name, value){
    var PropertyName = name;
    var PropertyValue = value;
    
    //Valid the input value。
    this.validateNewInputValue = function(newValue){
        if(newValue === PropertyValue){
            noticeAlert(false,'New value is the same as the old value! ('+PropertyName+')');
            return false;
        }
        if(PropertyName === 'displayName'){
            return true;
        }else if(PropertyName === 'emailAddress'){
            if(/^\S+@\S+\.\S+$/.test(newValue)){
                return true;
            }else{
                noticeAlert(false,'Invalid Email Address! Email address must contain @ and .')
            }
        }else if(PropertyName === 'phoneNumber'){
            if(/^\d{3}[\-]?\d{3}[\-]?\d{4}$/.test(newValue)){
                return true;
            }else{
                noticeAlert(false,'Invalid Phone Number! Phone number must be seven digits')
            }
        }else if(PropertyName === 'zipcode'){
            if(/^\d{5}(?:[-\s]\d{4})?$/.test(newValue)){
                return true;
            }else{
                noticeAlert(false,'Invalid Zipcode! Zipcode must be five digits')
            }
        }else if(PropertyName === 'password'){
            var confirm_password = document.getElementById('passwordConfirm');
            var confrimValue = confirm_password.value;
            confirm_password.value = '';
            if(newValue === confrimValue){
                return true;
            }else{
                noticeAlert(false,'Password must match!');
            }
        }
        return false;
    }
    
    this.setValue = function(newValue){ 
        PropertyValue = newValue;
    }

    this.getValue = function(){
        return PropertyValue;
    }
}

//Show alert.
function noticeAlert(flag,info){
    var noticeDiv = document.getElementById("page-notice");
    if(flag){
        noticeDiv.className = noticeDiv.className.replace(/(?:^|\s)alert-danger(?!\S)/g,"")
        noticeDiv.className += ' alert-success'
    }
    else{
        noticeDiv.className = noticeDiv.className.replace(/(?:^|\s)alert-success(?!\S)/g,"")
        noticeDiv.className += ' alert-danger'
    }
    noticeDiv.innerHTML =  info;
}

//Variable to mange all the properties.
var propertyTable = {};

//Click handler for update button.
function updateSubmit(){
    var changedProperties = [];
    var properties = document.getElementsByClassName('property');
    var validFlag = true;
    
    function findValidChangedProperties(item){
        var newValue = item.children[1].children[0].value;
        if(newValue!==''){
            if(propertyTable[item.id].validateNewInputValue(newValue)){
                changedProperties.push(item);
            }else{
                item.children[1].children[0].value = '';
                if(item.id==='password'){
                    var confirm_password = document.getElementById('passwordConfirm');
                    confirm_password.value = '';
                }
                validFlag = false;
            }       
        }
    }
    Array.from(properties).forEach(findValidChangedProperties);
    //Update when all changed properties are valid.
    if(validFlag && changedProperties.length!==0){
        function updateProperties(item){
            oldValue = propertyTable[item.id].getValue();
            newValue = item.children[1].children[0].value;
            item.children[1].children[0].value = '';
            propertyTable[item.id].setValue(newValue);
            item.children[2].innerHTML = (item.id==='password'?'Password have been changed!':newValue);
            propertyField = item.children[0].innerHTML;
        }
        changedProperties.forEach(updateProperties);
        noticeAlert(true,'Update success!');
    }   
}
