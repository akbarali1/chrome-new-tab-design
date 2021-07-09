$(document).ready(function() {
    var API_URL = 'http://ish.webschool.uz';
	let txt = "",
        table = "",
        tabstab = "",
		tshkilot = "";
		
  function isEmpty( el ){
      return !$.trim(el.html())
  }
  
	function tashilotall(value, index, array) {
     tshkilot += `<tr class="fs-6" id="id_`+value.trinn+`">
        <td class="verticala"><a href="` + value.basisnew + `" target="_blank">
        <img src="/svg/new.svg" alt="baby" title="Test yechish" style=" width: 50px; ">
        </a></td>
        <td class="verticala"><a href="` + value.print + `" target="_blank">
        <img src="/svg/print.svg" alt="baby" title="Test yechish" style=" width: 50px; ">
        </a></td>
        <td class="verticala"><a href="` + value.edit + `" target="_blank"><img src="/svg/edit.svg" alt="baby" title="Test yechish" style=" width: 50px; "></a></td>            
        <td class="verticala" width="10">` + value.time + `</td>
        <td class="verticala" width="10">#` + value.no + `</td>
        <td class="verticala" width="5%"><a href="` + value.summaedit + `" style="text-decoration: auto;color: black;font-weight: 900;" target="_blank">` + value.money + `</a></td>
        <td class="verticala" width="20%">
          <a href="` + value.xususiy_link + `" style="text-decoration: auto;color: black;font-weight: 900;">` + value.chiqnm + `</a>
        </td>
        <td class="verticala" width="10">` + value.chiqmfo + `</td>
        <td class="verticala" style=" font-size: 16px;">` + value.chiqxr + `</td>
      </tr>
	  <tr id="id_`+value.trinn+`">
        <td class="verticala table-dark fs-6">Maqsadi:</td>
        <td colspan="5">` + value.maqsad + `</td>
        <td class="verticala">` + value.kirnm + `</td>
        <td class="verticala">` + value.kirmfo + `</td>
        <td class="verticala">` + value.kirxr + `</td>
      </tr>`;
 }

    window.onclick = function(event) {
		var target = event.target;
		//console.log(target.matches);
		//console.log(event);
        if (target.matches('.clickableBtn')) {
            var $inn = $(target).attr('idbu');
            console.log($inn);
            $.ajax({
                url: API_URL + "/api/getTashkilot/",
                type: "POST",
                data: {inn: $inn},
                dataType: 'JSON',
                timeout: 10000,
                success: function(a) {
                   // console.log(a);
					$("#tbodtall").empty();
                    $('#title').text(a.message.title + " ga yozilgan hamma porucheniyalar");
                    $("#tableAll").show();
                    $('#myUL').hide();
                    $("#yopish").after(`<input type="button" id="orqaga" class="orqaga" value="Orqaga" style="position: fixed;right: 0;z-index: 99;padding: 15px;margin: 15px;top: 0;background: red;color: #fff;">`);
                    $("#yopish").remove();
                    const dfsddfads = a.message.info;
                    dfsddfads.forEach(tashilotall);
                    //document.getElementById("tbodtall").innerHTML = tshkilot;
					$("#tbodtall").html(tshkilot);
					$("#tbodtall > :not(#id_"+a.message.trinn+")").remove();
                }

            });
        }
		if (target.matches('#orqaga')) {
			$('#title').text("Hamma tashkilotlar ro`yhati");
			$('#tbodtall').empty();
			$('#tableAll').hide();
			$('#myUL').show();
			$("#orqaga").after(`<input type="button" id="yopish" value="Yopish" style="position: 	fixed;right: 0;z-index: 99;padding: 15px;margin: 15px;top: 0;background: red;color: #fff;">`);
			$("#orqaga").remove();
		}
		if (target.matches('#yopish')) {
			$('#tabs').hide();
		}
		if (target.matches('#qidirish')){
			$("#myInput").focus();
			$('#tabs').show();
			$('#tabs').css('opacity', '1');
if (isEmpty($('#myUL'))) {
          $.ajax({
            url: API_URL + "/api/alltashkilot/",
            beforeSend: function() {
                $('#title').text("Sahifa yuklanmoqda... Bir oz kuring!");
            },
            dataType: 'JSON',
            timeout: 10000,
            success: function(a) {
                $('#title').text("Hamma tashkilotlar ro`yhati");
                const info = a.message.info;
                info.forEach(AddTabs);
                //document.getElementById("myUL").innerHTML = tabstab;
				$("#myUL").html(tabstab);
		    },
          });
		 }
		}
		
    }

  const cyrillicPattern = /^[\u0400-\u04FF]+$/;
    $("#myInput").keyup(function() {
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        ul = document.getElementById("myUL");
        li = ul.getElementsByTagName("li");
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                if (input.value == null || input.value != "") {
                    if (cyrillicPattern.test(filter) == false) {
                        if (txtValue.toUpperCase().indexOf(lotin_kril(filter)) > -1) {
                            li[i].style.display = "";
                        } else {
                            li[i].style.display = "none";
                            //console.log('Лотиндан крилга ogirildi topilmadi')
                        }
                    } else {
                        if (txtValue.toUpperCase().indexOf(kril_lotin(filter)) > -1) {
                            li[i].style.display = "";
                        } else {
                            li[i].style.display = "none";
                            //console.log('Krildan lotinga ogirildi topilmadi')
                        }
                    }
                }
            }
        }
    });

	function myFunction(value, index, array) {
        txt += `
		<div class="col" ontouchstart="this.classList.toggle('hover');">
          <div class="container">
		  <a href="` + value.link + `" accesskey="` + value.accesskey + `" target="_blank">
            <div class="front">
              <div class="inner">
                <p>` + value.name + `</p>
                <!-- <span>Akbarali</span> -->
              </div>
            </div>
            <div class="back">
              <div class="inner">
                <p>` + value.description + `.</p>
              </div>
            </div>
			    </a>
          </div>
        </div>`;
    }

    function Topshiriqnoma(value, index, array) {
        table += `
    <tr class="fs-6">
    <td class="verticala"  width="3%"><a href="` + value.basisnew + `" target="_blank">
            <img src="/svg/new.svg" style=" width: 50px; ">
        </a>
    </td>
    <td class="verticala" width="3%"><a href="` + value.print + `" target="_blank">
            <img src="/svg/print.svg" style=" width: 50px; ">
        </a>
    </td>
    <td class="verticala" width="3%"><a href="` + value.edit + `" target="_blank">
            <img src="/svg/edit.svg" style=" width: 50px; "></a>
    </td>
    <td class="verticala" width="3%">` + value.time + `</td>
    <td class="verticala" width="20%">
        <a href="` + value.xususiy_link + `" style="text-decoration: none;color: black;font-weight: 900;" target="_blank">` + value.chiqnm + `</a>
    </td>
    <td class="verticala" width="5%">
        <a href="` + value.summaedit + `" style="text-decoration: none;color: black;font-weight: 900;" target="_blank">` + value.money + `</a>
    </td>
    <td class="verticala" width="25%" style=" font-size: 16px;">` + value.maqsad + `</td>
</tr>`;
    }

    function errorReponse() {
        $('#title').text('Internet bilan aloqa mavjud emas');
        txt = `<div class="col" ontouchstart="this.classList.toggle('hover');">
  <div class="container">
<div class="front" style=" background-color: red; ">
      <div class="inner">
        <p>Internet bilan aloqa uzuldi</p>
        <span>Internet mavjud emas</span>
      </div>
    </div>
    <div class="back" style=" background-color: red; ">
      <div class="inner">
        <p>Internet bilan aloqa yo'q. Internetingizni tekshiring va F5 tugmasini bosing.</p>
      </div>
    </div>
</div>
</div>`;
    }

    function NotAuthorized() {
        $('#title').text('Tizimga kirilmagan');
        txt = `<div class="col" ontouchstart="this.classList.toggle('hover');">
<div class="container">
<a href="` + API_URL + `/login/">
<div class="front" style=" background-color: red; ">
    <div class="inner">
      <p>Siz tizimga kirmagansiz</p>
      <span>Ma'lumotlarni ko'rish uchun tizimga kiring</span>
    </div>
  </div>
  <div class="back" style=" background-color: red; ">
    <div class="inner">
      <p>Siz kengaytmani muvafaqiyatli o'rnatgansiz. Lekin Avtorizatsiyadan o'tmagansiz. Iltimos tizimga kirish uchun bosing.</p>
    </div>
  </div>
  <a/>
</div>
</div>`;
    }

    function OneLoad() {
        $.ajax({
            url: API_URL + "/api/kengaytma/",
            beforeSend: function() {
                $('#title').text("Sahifa yuklanmoqda... Bir oz kuring!");
            },
            dataType: 'JSON',
            timeout: 10000,
            success: function(a) {
                $('#title').text(a.message.title);
                const links = a.message.page_info,
                    topshiriqnoma = a.message.porucheniya;
                topshiriqnoma.forEach(Topshiriqnoma);
                links.forEach(myFunction);
                document.getElementById("demo").innerHTML = txt;
                document.getElementById("myTable").innerHTML = table;
                $('.loading').hide();
            },
            error: function(request, status, error) {
                if (request.status == 404) {
                    NotAuthorized();
                } else {
                    errorReponse();
                }
                $('.search-wrapper').remove();
                $('#tabletest').remove();
                $('.loading').fadeToggle(2500);
                document.getElementById("demo").innerHTML = txt;
            }
        });
    }
   
   function AddTabs(value, index, array) {
        tabstab += `
    <li class="col-6">
        <a class="list-group-item list-group-item-action clickableBtn" idbu="` + value.inn + `" style=" cursor: pointer; ">` + value.id + `) ` + value.inn + ` || ` + value.name + `</a>
      </li>`;
    }
	
    function kril_lotin(car) {
        car = car.replace(/а/g, "a");
        car = car.replace(/б/g, "b");
        car = car.replace(/ч/g, "ch");
        car = car.replace(/д/g, "d");
        car = car.replace(/[еэ]/g, "e");
        car = car.replace(/ф/g, "f");
        car = car.replace(/г/g, "g");
        car = car.replace(/ғ/g, "g‘");
        car = car.replace(/ҳ/g, "h");
        car = car.replace(/и/g, "i");
        car = car.replace(/ж/g, "j");
        car = car.replace(/к/g, "k");
        car = car.replace(/қ/g, "q");
        car = car.replace(/л/g, "l");
        car = car.replace(/м/g, "m");
        car = car.replace(/н/g, "n");
        car = car.replace(/о/g, "o");
        car = car.replace(/ў/g, "o‘");
        car = car.replace(/п/g, "p");
        car = car.replace(/р/g, "r");
        car = car.replace(/с/g, "s");
        car = car.replace(/ш/g, "sh");
        car = car.replace(/т/g, "t");
        car = car.replace(/у/g, "u");
        car = car.replace(/в/g, "v");
        car = car.replace(/х/g, "x");
        car = car.replace(/й/g, "y");
        car = car.replace(/з/g, "z");
        car = car.replace(/ъ/g, "’");
        car = car.replace(/ь/g, "");
        car = car.replace(/А/g, "A");
        car = car.replace(/Б/g, "B");
        car = car.replace(/Ч/g, "Ch");
        car = car.replace(/Д/g, "D");
        car = car.replace(/[ЕЭ]/g, "E");
        car = car.replace(/Ф/g, "F");
        car = car.replace(/Г/g, "G");
        car = car.replace(/Ғ/g, "G‘");
        car = car.replace(/Ҳ/g, "H");
        car = car.replace(/И/g, "I");
        car = car.replace(/Ж/g, "J");
        car = car.replace(/К/g, "K");
        car = car.replace(/Қ/g, "Q");
        car = car.replace(/Л/g, "L");
        car = car.replace(/М/g, "M");
        car = car.replace(/Н/g, "N");
        car = car.replace(/О/g, "O");
        car = car.replace(/Ў/g, "O‘");
        car = car.replace(/П/g, "P");
        car = car.replace(/Р/g, "R");
        car = car.replace(/С/g, "S");
        car = car.replace(/Ш/g, "Sh");
        car = car.replace(/Т/g, "T");
        car = car.replace(/У/g, "U");
        car = car.replace(/В/g, "V");
        car = car.replace(/Х/g, "X");
        car = car.replace(/Й/g, "Y");
        car = car.replace(/З/g, "Z");
        car = car.replace(/Ъ/g, "’");
        car = car.replace(/Ь/g, "");
        car = car.replace(/я/g, "ya");
        car = car.replace(/ё/g, "yo");
        car = car.replace(/ю/g, "yu");
        car = car.replace(/ц/g, "ts");
        car = car.replace(/Я/g, "Ya");
        car = car.replace(/Ё/g, "Yo");
        car = car.replace(/Ю/g, "Yu");
        car = car.replace(/Ц/g, "Ts");
        return car;
    }

    function lotin_kril(car) {
        car = car.replace(/\n/g, "\n ");
        car = car.replace(/,/g, ", ");
        car = car.replace(/:/g, ": ");
        car = car.replace(/;/g, "\? ");
        car = car.replace(/·/g, "\; ");
        car = car.replace(/\./g, "\. ");
        car = car.replace(/!/g, "! ");
        car = car.replace(/‘/g, "ъ");
        car = car.replace(/’/g, "ъ");
        car = car.replace(/\'/g, "ъ");
        car = car.replace(/ʻ/g, "ъ");
        car = car.replace(/ʼ/g, "ъ");
        car = car.replace(/h/g, "ҳ");
        car = car.replace(/a/g, "а");
        car = car.replace(/b/g, "б");
        car = car.replace(/cҳ/g, "ч");
        car = car.replace(/d/g, "д");
        car = car.replace(/e/g, "е");
        car = car.replace(/ е/g, " э");
        car = car.replace(/f/g, "ф");
        car = car.replace(/g/g, "г");
        car = car.replace(/гъ/g, "ғ");
        car = car.replace(/i/g, "и");
        car = car.replace(/j/g, "ж");
        car = car.replace(/k/g, "к");
        car = car.replace(/q/g, "қ");
        car = car.replace(/l/g, "л");
        car = car.replace(/m/g, "м");
        car = car.replace(/n/g, "н");
        car = car.replace(/o/g, "о");
        car = car.replace(/оъ/g, "ў");
        car = car.replace(/p/g, "п");
        car = car.replace(/r/g, "р");
        car = car.replace(/s/g, "с");
        car = car.replace(/сҳ/g, "ш");
        car = car.replace(/t/g, "т");
        car = car.replace(/u/g, "у");
        car = car.replace(/v/g, "в");
        car = car.replace(/x/g, "х");
        car = car.replace(/y/g, "й");
        car = car.replace(/z/g, "з");
        car = car.replace(/A/g, "А");
        car = car.replace(/B/g, "Б");
        car = car.replace(/H/g, "Ҳ");
        car = car.replace(/CҲ/g, "Ч");
        car = car.replace(/Cҳ/g, "Ч");
        car = car.replace(/D/g, "Д");
        car = car.replace(/E/g, "Е");
        car = car.replace(/ Е/g, " Э");
        car = car.replace(/F/g, "Ф");
        car = car.replace(/G/g, "Г");
        car = car.replace(/Гъ/g, "Ғ");
        car = car.replace(/I/g, "И");
        car = car.replace(/J/g, "Ж");
        car = car.replace(/K/g, "К");
        car = car.replace(/Q/g, "Қ");
        car = car.replace(/L/g, "Л");
        car = car.replace(/M/g, "М");
        car = car.replace(/N/g, "Н");
        car = car.replace(/O/g, "О");
        car = car.replace(/Оъ/g, "Ў");
        car = car.replace(/P/g, "П");
        car = car.replace(/R/g, "Р");
        car = car.replace(/S/g, "С");
        car = car.replace(/СҲ/g, "Ш");
        car = car.replace(/Сҳ/g, "Ч");
        car = car.replace(/T/g, "Т");
        car = car.replace(/U/g, "У");
        car = car.replace(/V/g, "В");
        car = car.replace(/X/g, "Х");
        car = car.replace(/Y/g, "Й");
        car = car.replace(/Z/g, "З");
        car = car.replace(/йа/g, "я");
        car = car.replace(/йо/g, "ё");
        car = car.replace(/йу/g, "ю");
        car = car.replace(/тс/g, "ц");
        car = car.replace(/ЙА/g, "Я");
        car = car.replace(/ЙО/g, "Ё");
        car = car.replace(/ЙУ/g, "Ю");
        car = car.replace(/ТС/g, "Ц");
        car = car.replace(/Йа/g, "Я");
        car = car.replace(/Йе/g, "Ё");
        car = car.replace(/Йу/g, "Ю");
        car = car.replace(/Тс/g, "Ц");
        car = car.replace(/\n /g, "\n");
        return car;
    }

    OneLoad();
});