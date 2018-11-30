function addLoadEvent(func) {
    var oldonload = window.onload;
    if(typeof window.onload != 'function'){
        window.onload = func;
    }else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}
function insertAfter(newElement,targetElement){
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){parent.appendChild(newElement);}
    else{parent.insertBefore(newElement,targetElement.nextSibling);}
}
function addClass(element,value) {
    if(!element.className){element.className = value;}
    else{
        newClassName = element.className;
        newClassName += ' ';
        newClassName += value;
        element.className = newClassName;
    }
}

function moveElement(elementID,final_x,final_y,interval) {
    if(!document.getElementById){return false;}
    if(!document.getElementById(elementID)){return false;}
    var elem = document.getElementById(elementID);
    if(elem.movement){clearTimeout(elem.movement);}
    //if(!elem.style.left || !elem.style.top){return false;}
    if(!elem.style.left){elem.style.left = '0px';}
    if(!elem.style.top){elem.style.top = '0px';}
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if(xpos == final_x && ypos == final_y){return true;}
    if(xpos < final_x){
        dist = Math.ceil((final_x - xpos)/10);
        xpos += dist;}
    if(xpos > final_x){
        dist = Math.ceil((xpos - final_x)/10);
        xpos -= dist;}
    if(ypos < final_y){
        dist = Math.ceil((final_x - ypos)/10);
        ypos += dist;}
    if(ypos > final_y){
        dist = Math.ceil((ypos - final_x)/10);
        ypos -= dist;}
    elem.style.left = xpos + 'px';
    elem.style.top = ypos + 'px';
    var repeat = 'moveElement'+'("'+elementID+'",'+final_x+','+final_y+','+interval+')';
    elem.movement = setTimeout(repeat,interval);
}

function prepareSlideshow() {
    if(!document.getElementsByTagName){return false;}
    if(!document.getElementById){return false;}
    if(!document.getElementById('intro')){return false;}
    var intro = document.getElementById('intro');
    var slideshow = document.createElement('div');
    slideshow.setAttribute('id','slideshow');
    var frame = document.createElement('img');
    frame.setAttribute('src','images/frame.gif');
    frame.setAttribute('alt','');
    frame.setAttribute('id','frame');
    slideshow.appendChild(frame);
    var preview = document.createElement('img');
    preview.setAttribute('src','images/slideshow.jpg');
    preview.setAttribute('alt','a glimpse of what awaits you');
    preview.setAttribute('id','preview');
    slideshow.appendChild(preview);
    insertAfter(slideshow,intro);
    //var links = intro.getElementsByTagName('a');
    var links = document.getElementsByTagName('a');
    var destination;
    for(var i = 0;i < links.length;i++){
        links[i].onmouseover = function () {
            destination = this.getAttribute('href');
            if(destination.indexOf('index.html') != -1){
                moveElement('preview',0,0,5);
            }
            if(destination.indexOf('about.html') != -1){
                moveElement('preview',-150,0,5);
            }
            if(destination.indexOf('photos.html') != -1){
                moveElement('preview',-300,0,5);
            }
            if(destination.indexOf('live.html') != -1){
                moveElement('preview',-450,0,5);
            }
            if(destination.indexOf('contact.html') != -1){
                moveElement('preview',-600,0,5);
            }
        }
    }
}
function highlightPage() {
    if(!document.getElementsByTagName){return false;}
    if(!document.getElementById){return false;}
    var headers = document.getElementsByTagName('header');
    if(headers.length == 0){return false;}
    var navs = headers[0].getElementsByTagName('nav');
    if(navs.length == 0){return false;}
    var links = navs[0].getElementsByTagName('a');
    var linkurl;
    for(var i = 0;i < links.length;i++){
        linkurl = links[i].getAttribute('href');
        if(window.location.href.indexOf(linkurl) != -1){
            links[i].className = 'here';
            var linktext = links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute('id',linktext);
        }
    }
}

function showSection(id) {
    var sections = document.getElementsByTagName('section');
    for(var i = 0;i < sections.length;i++){
        if(sections[i].getAttribute('id') != id){
            sections[i].style.display = 'none';}
        else{sections[i].style.display = 'block';}
    }
}
function prepareInternalnav() {
    if(!document.getElementsByTagName){return false;}
    if(!document.getElementById){return false;}
    var articles = document.getElementsByTagName('article');
    if(articles.length == 0){return false;}
    var navs = articles[0].getElementsByTagName('nav');
    if(navs.length == 0){return false;}
    var nav = navs[0];
    var links = nav.getElementsByTagName('a');
    for(var i = 0;i < links.length;i++){
        var sectionId = links[i].getAttribute('href').split('#')[1];
        if(!document.getElementById(sectionId)){continue;}
        document.getElementById(sectionId).style.display = 'none';
        links[i].destination = sectionId;
        links[i].onclick = function () {
            showSection(this.destination);
            return false
        }
    }
}

function showPic(whichpic) {
    if (!document.getElementById('placeholder')) {
        return false;
    }
    var source = whichpic.getAttribute('href');
    var placeholder = document.getElementById('placeholder');
    if(placeholder.nodeName != 'IMG'){
        return false;}
    placeholder.setAttribute('src', source);
    if (document.getElementById('description')) {
        var description = document.getElementById('description');
        var text = whichpic.getAttribute('title')? whichpic.getAttribute('title') : '';
        description.firstChild.nodeValue = text;
    }
    return true;
}

function preparePlaceholder() {
    if(!document.createElement){return false;};
    if(!document.createTextNode){return false;};
    if(!document.getElementById){return false;};
    if(!document.getElementById('imagegallery')){return false;};
    var placeholder = document.createElement('img');
    placeholder.setAttribute('id','placeholder');
    placeholder.setAttribute('src','images/placeholder.gif');
    placeholder.setAttribute('alt','my image gallery');
    var description = document.createElement('p');
    description.setAttribute('id','description');
    var desctext = document.createTextNode('Choose an image.');
    description.appendChild(desctext);
    var gallery = document.getElementById('imagegallery');
    insertAfter(description,gallery);
    insertAfter(placeholder,description);
}

function prepareGallery() {
    if(!document.getElementsByTagName){return false;}
    if(!document.getElementById){return false;}
    if(!document.getElementById('imagegallery')){return false;}
    var gallery = document.getElementById('imagegallery');
    var links = gallery.getElementsByTagName('a');
    for(var i = 0;i < links.length;i++){
        links[i].onclick = function () {
            return !showPic(this);
        }
    }
}

function stripeTables() {
    if(!document.getElementsByTagName){return false;}
    var tables = document.getElementsByTagName('table');
    for(var i = 0;i < tables.length;i++){
        var odd = 2;
        var rows = tables[i].getElementsByTagName('tr');
        for(var j = 0;j < rows.length;j++){
            if(odd == 1){
                addClass(rows[j],'odd');
                odd = 2;}
            else{
                odd = 1;
            }
        }
    }
}

function displayAbbreviations() {
    if(!document.getElementsByTagName || !document.createElement || !document.createTextNode){return false;}
    //取得所有缩略词
    var abbrs = document.getElementsByTagName('abbr');
    var defs =new Array();
    if(abbrs.length < 1){return false;}
    //遍历这些缩略词
    for(var i = 0;i < abbrs.length;i++){
        var current_abbr = abbrs[i];
        if(current_abbr.childNodes.length < 1){continue;}
        var definition = current_abbr.getAttribute('title');
        var key = current_abbr.firstChild.nodeValue;
        defs[key] = definition;
    }
    console.log(defs);
    //创建定义列表
    var dlist = document.createElement('dl');
    //遍历定义
    for (key in defs){
        var definition = defs[key];
        //创建定义标题
        var dtitle = document.createElement('dt');
        var dtitle_text =document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        //创建定义描述
        var ddesc = document.createElement('dd');
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
        //把它们添加到定义列表
        dlist.appendChild(dtitle);
        dlist.appendChild(ddesc);
    }
    if(dlist.childNodes.length < 1){return false;}
    //创建标题
    var header = document.createElement('h3');
    var header_text = document.createTextNode('Abbreviations');
    header.appendChild(header_text);

    var articles = document.getElementsByTagName('article');
    if(articles.length == 0){return false;}
    var container = articles[0];
    container.appendChild(header);
    //把标题添加到页面主题
    //把定义列表添加到页面主体
    container.appendChild(dlist);
}

function highlightRows() {
    if(!document.getElementsByTagName){return false;}
    var rows = document.getElementsByTagName('tr');
    for(var i = 0;i < rows.length;i++){
        rows[i].oldClassName = rows[i].className;
        rows[i].onmouseover = function () {
            addClass(this,'highlight')
        };
        rows[i].onmouseout = function () {
            this.className = this.oldClassName;
        };
    }
}

function focusLabels() {
    if(!document.getElementsByTagName){return false;}
    var labels = document.getElementsByTagName('label');
    for(var i = 0;i < labels.length;i++){
        if(!labels[i].getAttribute('for')) {
            continue;
        }
        labels[i].onclick = function () {
            var id = this.getAttribute('for');
            if(!document.getElementById(id)){return false;}
            var element = document.getElementById(id);
            element.focus();
        }
    }
}
function resetFields(whichform){
    if(Modernizr.input.placeholder){return;}
    for(var i = 0;i < whichform.elements.length;i++) {
        var element = whichform.elements[i];
        if (element.type == 'submit') {
            continue;
        }
        var check = element.placeholder || element.getAttribute('placeholder');
        if (!check) {
            continue;
        }
        element.onfocus = function () {
            var text = this.placeholder || this.getAttribute('placeholder');
            if(this.value == text){
                this.className ='';
                this.value = '';
            }
        }
        element.onblur = function () {
            if(this.value == ''){this.className = 'placeholder';
            this.value = this.placeholder || this.getAttribute('placeholder')};
        }
    }
    element.onblur();
}
function prepareForms() {
    console.log(document.forms);
    for(var i = 0;i < document.forms.length;i++){
        var thisform = document.forms[i];
        resetFields(thisform);
    }
}

function isFilled(field) {
    if(field.value.replace(' ','').length == 0){return false;}
    var placeholder = field.placeholder || field.getAttribute('placeholder');
    return (field.value != placeholder);
}
function isEmail(field) {
    return (field.value.indexOf('@') != -1 && field.value.indexOf('.') != 1);
}
function validateForm(whichform) {
    for(var i = 0;i < whichform.elements.length;i++){
        var element = whichform.elements[i];
        if(element.required = 'required'){
            if(!isFilled(element)){alert('请输入' + element.name + 'field')
            return false;
            }
        }
        if(element.type == 'email'){
            if(!isEmail(element)){
                alert('the' + element.name + 'field must be a valid email address.');
                return false;
            }
        }
    }
    return false;
}
addLoadEvent(prepareForms);
addLoadEvent(focusLabels);

addLoadEvent(stripeTables);
addLoadEvent(displayAbbreviations);
addLoadEvent(highlightRows);

addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);