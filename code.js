var protokol = window.location.protocol;
if (protokol === 'chrome-extension:') {
    $(document).ready(function() {
        var API_URL = 'http://ish.webschool.uz';
        let txt = "",
            table = "",
            tabstab = "",
            tshkilot = "";

        function isEmpty(el) {
            return !$.trim(el.html())
        }

        function tashilotall(value, index, array) {
            tshkilot += `<tr class="fs-6" id="id_` + value.trinn + `">
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
	  <tr id="id_` + value.trinn + `">
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
                    data: {
                        inn: $inn
                    },
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
                        $("#tbodtall > :not(#id_" + a.message.trinn + ")").remove();
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
            if (target.matches('#qidirish')) {
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
                                //console.log('???????????????? ???????????? ogirildi topilmadi')
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
            car = car.replace(/??/g, "a");
            car = car.replace(/??/g, "b");
            car = car.replace(/??/g, "ch");
            car = car.replace(/??/g, "d");
            car = car.replace(/[????]/g, "e");
            car = car.replace(/??/g, "f");
            car = car.replace(/??/g, "g");
            car = car.replace(/??/g, "g???");
            car = car.replace(/??/g, "h");
            car = car.replace(/??/g, "i");
            car = car.replace(/??/g, "j");
            car = car.replace(/??/g, "k");
            car = car.replace(/??/g, "q");
            car = car.replace(/??/g, "l");
            car = car.replace(/??/g, "m");
            car = car.replace(/??/g, "n");
            car = car.replace(/??/g, "o");
            car = car.replace(/??/g, "o???");
            car = car.replace(/??/g, "p");
            car = car.replace(/??/g, "r");
            car = car.replace(/??/g, "s");
            car = car.replace(/??/g, "sh");
            car = car.replace(/??/g, "t");
            car = car.replace(/??/g, "u");
            car = car.replace(/??/g, "v");
            car = car.replace(/??/g, "x");
            car = car.replace(/??/g, "y");
            car = car.replace(/??/g, "z");
            car = car.replace(/??/g, "???");
            car = car.replace(/??/g, "");
            car = car.replace(/??/g, "A");
            car = car.replace(/??/g, "B");
            car = car.replace(/??/g, "Ch");
            car = car.replace(/??/g, "D");
            car = car.replace(/[????]/g, "E");
            car = car.replace(/??/g, "F");
            car = car.replace(/??/g, "G");
            car = car.replace(/??/g, "G???");
            car = car.replace(/??/g, "H");
            car = car.replace(/??/g, "I");
            car = car.replace(/??/g, "J");
            car = car.replace(/??/g, "K");
            car = car.replace(/??/g, "Q");
            car = car.replace(/??/g, "L");
            car = car.replace(/??/g, "M");
            car = car.replace(/??/g, "N");
            car = car.replace(/??/g, "O");
            car = car.replace(/??/g, "O???");
            car = car.replace(/??/g, "P");
            car = car.replace(/??/g, "R");
            car = car.replace(/??/g, "S");
            car = car.replace(/??/g, "Sh");
            car = car.replace(/??/g, "T");
            car = car.replace(/??/g, "U");
            car = car.replace(/??/g, "V");
            car = car.replace(/??/g, "X");
            car = car.replace(/??/g, "Y");
            car = car.replace(/??/g, "Z");
            car = car.replace(/??/g, "???");
            car = car.replace(/??/g, "");
            car = car.replace(/??/g, "ya");
            car = car.replace(/??/g, "yo");
            car = car.replace(/??/g, "yu");
            car = car.replace(/??/g, "ts");
            car = car.replace(/??/g, "Ya");
            car = car.replace(/??/g, "Yo");
            car = car.replace(/??/g, "Yu");
            car = car.replace(/??/g, "Ts");
            return car;
        }

        function lotin_kril(car) {
            car = car.replace(/\n/g, "\n ");
            car = car.replace(/,/g, ", ");
            car = car.replace(/:/g, ": ");
            car = car.replace(/;/g, "\? ");
            car = car.replace(/??/g, "\; ");
            car = car.replace(/\./g, "\. ");
            car = car.replace(/!/g, "! ");
            car = car.replace(/???/g, "??");
            car = car.replace(/???/g, "??");
            car = car.replace(/\'/g, "??");
            car = car.replace(/??/g, "??");
            car = car.replace(/??/g, "??");
            car = car.replace(/h/g, "??");
            car = car.replace(/a/g, "??");
            car = car.replace(/b/g, "??");
            car = car.replace(/c??/g, "??");
            car = car.replace(/d/g, "??");
            car = car.replace(/e/g, "??");
            car = car.replace(/ ??/g, " ??");
            car = car.replace(/f/g, "??");
            car = car.replace(/g/g, "??");
            car = car.replace(/????/g, "??");
            car = car.replace(/i/g, "??");
            car = car.replace(/j/g, "??");
            car = car.replace(/k/g, "??");
            car = car.replace(/q/g, "??");
            car = car.replace(/l/g, "??");
            car = car.replace(/m/g, "??");
            car = car.replace(/n/g, "??");
            car = car.replace(/o/g, "??");
            car = car.replace(/????/g, "??");
            car = car.replace(/p/g, "??");
            car = car.replace(/r/g, "??");
            car = car.replace(/s/g, "??");
            car = car.replace(/????/g, "??");
            car = car.replace(/t/g, "??");
            car = car.replace(/u/g, "??");
            car = car.replace(/v/g, "??");
            car = car.replace(/x/g, "??");
            car = car.replace(/y/g, "??");
            car = car.replace(/z/g, "??");
            car = car.replace(/A/g, "??");
            car = car.replace(/B/g, "??");
            car = car.replace(/H/g, "??");
            car = car.replace(/C??/g, "??");
            car = car.replace(/C??/g, "??");
            car = car.replace(/D/g, "??");
            car = car.replace(/E/g, "??");
            car = car.replace(/ ??/g, " ??");
            car = car.replace(/F/g, "??");
            car = car.replace(/G/g, "??");
            car = car.replace(/????/g, "??");
            car = car.replace(/I/g, "??");
            car = car.replace(/J/g, "??");
            car = car.replace(/K/g, "??");
            car = car.replace(/Q/g, "??");
            car = car.replace(/L/g, "??");
            car = car.replace(/M/g, "??");
            car = car.replace(/N/g, "??");
            car = car.replace(/O/g, "??");
            car = car.replace(/????/g, "??");
            car = car.replace(/P/g, "??");
            car = car.replace(/R/g, "??");
            car = car.replace(/S/g, "??");
            car = car.replace(/????/g, "??");
            car = car.replace(/????/g, "??");
            car = car.replace(/T/g, "??");
            car = car.replace(/U/g, "??");
            car = car.replace(/V/g, "??");
            car = car.replace(/X/g, "??");
            car = car.replace(/Y/g, "??");
            car = car.replace(/Z/g, "??");
            car = car.replace(/????/g, "??");
            car = car.replace(/????/g, "??");
            car = car.replace(/????/g, "??");
            car = car.replace(/????/g, "??");
            car = car.replace(/????/g, "??");
            car = car.replace(/????/g, "??");
            car = car.replace(/????/g, "??");
            car = car.replace(/????/g, "??");
            car = car.replace(/????/g, "??");
            car = car.replace(/????/g, "??");
            car = car.replace(/????/g, "??");
            car = car.replace(/????/g, "??");
            car = car.replace(/\n /g, "\n");
            return car;
        }

        OneLoad();
    });
}
