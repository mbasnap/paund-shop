<template>
<div class="row">
  <div class="col border-right" style="font-size: 14px;"> <!--Left side-->
    <div class="row pr-3" style="font-size: 12px;"> <!--по ОКПО Форма по ОКУД -->
      <div class="col p-0" >
        <div class="row" style="height: 25px;">
          <div class="col"></div>
        </div>
        <div class="row m-0" style="height: 14px; text-align: right;">
          <div class="col">ИНН</div>
        </div>
        <div class="row" style="height: 25px;">
          <div class="col">
            <div class="row">
              <div class="col-3"></div>
            </div>
          </div>
        </div>
        <div class="col" style="margin-top: -12px;">
          <div class="row m-0" style="font-size: 14px;">
            <div class="col"><strong>{{ company.title }}</strong></div>
          </div>
          <div class="row m-0" style="font-style: italic; font-size: 10px; text-align: center;"> <!--организация-->
            <div class="col p-0 border-top">(юридическое лицо/предприниматель)</div>
          </div>
        </div>        
        <div class="col">
          <div class="col p-0 border-top mt-2" style="font-style: italic; font-size: 10px; text-align: center;">
            {структурное подразделение}
          </div>              
        </div>  

      </div>
      <div class="col-3 border" style="text-align: center;"> <!--Код 0310001 -->
        <div class="row border-bottom" style="height: 25px;">
          <div class="col">Код</div>
        </div>
        <div class="row border-bottom" style="height: 25px;">
          <div class="col">{{ depKod }}</div>
        </div>
        <div class="row border-bottom" style="height: 25px;">
          <div class="col"></div>
        </div>
        <div class="row border-bottom" style="height: 25px;">
          <!-- <div class="col"></div> -->
        </div>
      </div>
    </div>
    <div class="row pr-3 mt-3"><!-- ПРИХОДНЫЙ КАССОВЫЙ ОРДЕР -->
      <div class="col" style="line-height: 4; font-size: 12px;">
        <strong>ПРИХОДНЫЙ КАССОВЫЙ ОРДЕР</strong>
      </div>
      <div class="col-6" style="text-align: center">
        <div class="row border-top border-left border-right" style="font-size: 10px; line-height: 3;"> 
          <div class="col-5 border-right">
            <div class="row">
              <div class="col p-0">Номер документа</div>
            </div>
          </div>
          <div class="col">
            <div class="row">
              <div class="col p-0" style="">Дата составления</div>
            </div>
          </div>
        </div>
        <div class="row border" >
          <div class="col-5 p-0 border-right">
            <strong>№ {{order.dt}}</strong>
          </div>
          <div class="col p-0" style="font-size: 13px;">{{date}}</div>
        </div>
      </div>
    </div>
    <div class="mt-2" >
      <table  border="1" style="border: 1px solid; border-color: #b3b1b1;">
        <tbody>
          <tr style="font-size: 12px;">
            <td rowspan="2" width="20px">
              <div>
                <div style="text-align: center;">
                  Дебет
                </div>
              </div>
              <div>
                &nbsp;
              </div>
            </td>
            <td style="width: 404px; text-align: center;" colspan="4">
              Кредит
            </td>
            <td style="width: 69px; text-align: center;" rowspan="2">
              Сумма, руб. коп.
            </td>
            <td style="width: 40px; font-size: 10px; text-align: right;" rowspan="2">
              Код це-левого назна-чения
            </td>
            <td style="width: 20px; text-align: center;" rowspan="2">
              &nbsp;
            </td>
          </tr>
          <tr style="font-size: 10px;">
            <td width="20px"> </td>
            <td style="width: 40px; text-align: center;">
              код структурного подразделения
            </td>
            <td style="width: 100px; text-align: center;">
              корреспон-дирующий счет, субсчёт
            </td>
            <td style="width: 40px; text-align: center;">
              код аналитичес-кого учета
            </td>
          </tr>
          <tr v-for="(v, i) in values" :key="i" style="border-bottom: none; font-size: 11px;">
              <td style="text-align: center;">
                <span v-if="i===0">301</span>
              </td>
              <td></td>
              <td style="text-align: center;">
                <span v-if="i===0">{{depKod}}</span>
              </td>
              <td class="pl-1" style="width: 93px; " colspan="2">
                <span>{{getAccount(v)}}</span>
              </td>
              <td class="pl-1" colspan="2" style="max-width: 150px; white-space: nowrap;">
                {{ short(v.summ) }}
              </td>
              <td >&nbsp;</td>
          </tr>
        </tbody>
      </table>
    </div>


  <div class="mt-2" style="font-size: 14px">
      <div class="row m-0">
        <div class="col-3 p-0">Принято от</div>
        <div class="col p-0 border-bottom">{{ fullName }}</div>
      </div>

      <div class="row" > 
        <div class="col" >
          <div class=" border-bottom"> Основание: {{ purposeOfPayment}}</div>
          <div class=" border-bottom" style="height: 15px;"></div>
        </div>
      </div>
      <div class="row" > <!--Сумма-->
        <div class="col" >
          <div class=" border-bottom">Сумма: {{ toWordsRu }}</div>
          
          <div class="col" style="font-size: 10px; font-style: italic; text-align: center;">
            (прописью)
          </div>
        </div>
      </div>
      <div class="row m-0" > <!-- В том числе-->
        <div class="col-2 p-0">В том числе</div>
        <div class="col border-bottom"></div>
      </div>
      <div class="row m-0 mt-3"> <!-- Приложение-->
        <div class="col-2 p-0">Приложение</div>
        <div class="col border-bottom" style="font-size: 12px;">{{ docToString }}</div>
      </div>
      <div class="row m-0 mt-2"> <!-- Главный бухгалтер -->
        <div class="col-4 p-0">Главный бухгалтер</div>
        <div class="col p-0">
          <div class="row m-0" style="height: 25px; text-align: center;">
            <div class="col-3 p-0 border-bottom mr-3"></div>
            <div class="col p-0 border-bottom">{{ company.bookkeeper }}</div>
          </div>
        </div>
      </div>
      <div class="row" style="font-size: 12px; line-height: 10px; text-align: center;">
        <div class="col-4"></div>
        <div class="col">
          <div class="row" style="font-style: italic; font-size: 10px; text-align: center;">
            <div class="col-3 mr-3">(подпись)</div>
            <div class="col">(расшифровка подписи)</div>
          </div>
        </div>
      </div>
       <div class="row m-0 mt-2"> <!-- Получил кассир -->
        <div class="col-4 p-0">Получил кассир</div>
        <div class="col ">
          <div class="row" style="height: 25px; text-align: center;">
            <div class="col-3 border-bottom mr-3"></div>
            <div class="col border-bottom">{{ kassir }}</div>
          </div>
        </div>
      </div>
      <div class="row" style="font-size: 12px; line-height: 10px; text-align: center;">
        <div class="col-4"></div>
        <div class="col">
          <div class="row" style="font-style: italic; font-size: 10px; text-align: center;">
            <div class="col-3 mr-3">(подпись)</div>
            <div class="col">(расшифровка подписи)</div>
            <div class="col-2"></div>
          </div>
        </div>
      </div>
  </div>

  </div>
  <div class="col-4" style="font-size: 14px;">
    <div >
      <div class="row" style="font-size: 12px;">
        <div class="col"><strong>{{ company.title }}</strong></div>
      </div>
      <div class="row" style="font-style: italic; font-size: 10px; text-align: center;"> <!--организация-->
        <div class="col p-0 border-top">(юридическое лицо предприниматель)</div>
      </div>
    </div>
    <div class="row"> <!--КВИТАНЦИЯ-->
      <div class="col" style="text-align: center;"><strong>КВИТАНЦИЯ</strong></div>
    </div>
    <div class="row mt-2" style="font-size: 12px;"> 
      <!--к приходному кассовому ордеру №-->
      <div class="col pr-0">	к приходному кассовому ордеру</div>
      <div class="col-2 p-0 border-bottom" style="text-align: left;">
        <strong>№ {{ order.dt }}</strong>
      </div>
    </div>
    <div class="row" style="font-size: 14px;">  <!--от «_____»	__________________г.-->
      <div class="col " > от {{ date }}</div>
    </div>

    <div class="row mt-2" style="font-size: 14px;">
      <div class="col" >
        <div class=" border-bottom" > Принято от: {{ fullName }} </div>
        <div class=" border-bottom" style="height: 20px;"></div>
      </div>
    </div>
    <div class="row" > <!--Основание--> 
      <div class="col" >
        <div class=" border-bottom"> Основание: {{ purposeOfPayment }} </div>
        <div class=" border-bottom" style="height: 20px;"></div>
      </div>
    </div>
    <div class="row" > <!--Сумма-->
      <div class="col-3 pr-0">Сумма:</div>
      <div class="col border-bottom">{{ short(summ) }}</div>
    </div>
    <div class="row">
      <div class="col" style="font-style: italic; font-size: 10px; text-align: center;">
        (цифрами)
      </div>
      <div class="col-2"></div>
    </div>
    <div class="row mt-2">
      <div class="col" >
        <div class=" border-bottom">{{ toWordsRu }}</div>
        <div class="row" style="font-style: italic; font-size: 10px; text-align: center;">
          <div class="col">(прописью)</div>
        </div>
        <div class=" border-bottom" style="height: 10px;"></div>
      </div>
    </div>
    <div class="row" > <!--В том числе-->
      <div class="col-5 pr-0">В том числе</div>
      <div class="col border-bottom"></div>
    </div>
    <div class="row mt-2">
      <div class="col" >
        <strong class="border-bottom">{{ date }}</strong>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col">
        <strong>М. П.</strong>
        <span style="font-style: italic; font-size: 12px; text-align: center;">(штампа)</span>
      </div>
    </div>
    <div class="row mt-2" style="font-size: 12px;">
      <div class="col-3 pr-0">Главный бухгалтер</div>
      <div class="col">
        <div class="row" style="height: 20px;">
          <div class="col-4 pl-0 mr-2 border-bottom"></div>
          <div class="col border-bottom p-0" style="text-align: center;">{{ company.bookkeeper }}</div>
        </div>
        <div class="row " style="font-style: italic; font-size: 10px; text-align: center;">
          <div class="col pl-0 ">(подпись)</div>
          <div class="col pl-0 ">(расшифровка подписи)</div>
        </div>
      </div>
    </div>
    <div class="row mt-3" style="font-size: 12px;"> <!--Кассир-->
      <div class="col-3 pr-0">Кассир</div>
      <div class="col">
        <div class="row" style="height: 20px;">
          <div class="col-4 pl-0 mr-2 border-bottom"></div>
          <div class="col border-bottom p-0" style="text-align: center;">
            {{ kassir }}
          </div>
        </div>
        <div class="row " style="font-style: italic; font-size: 10px; text-align: center;">
          <div class="col pl-0" >(подпись)</div>
          <div class="col pl-0">(расшифровка подписи)</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import mixins from './mixins'

export default {
  mixins: [mixins],
  data: () => ({
    type: 'dt'
  }),
  computed: {

  }
}
</script>

<style></style>