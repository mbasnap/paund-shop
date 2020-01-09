<template>
<div class="row p-3">
  <div class="col pr-4 border-right"> <!--Left side-->
      <div class="row"> <!--Унифицированная форма № КО-1 -->
        <div class="col" style="font-size: 12px; text-align: right; line-height: 0px;">
          <p>Унифицированная форма № КО-1</p>
          <p>Утверждена постановлением Госкомстата</p>
          <p>России от 18.08.98 г. №88</p>
        </div>
      </div>
      <div class="row"> <!--по ОКПО Форма по ОКУД -->
        <div class="col" style="text-align: right;">
          <div class="row" style="height: 25px;">
            <div class="col"></div>
          </div>
          <div class="row" style="height: 25px;">
            <div class="col">Форма по ОКУД</div>
          </div>
          <div class="row" style="height: 25px;">
            <div class="col">
              <div class="row"> <!--по ОКПО -->
                <div class="col border-bottom"></div>
                <div class="col-3">по ОКПО</div>
              </div>
            </div>
          </div>
          <div class="row border-bottom" style="height: 25px;"> <!--организация -->
              <div class="col" style="font-size: 12px; line-height: 10px; text-align: center;">организация</div>
              <div class="col-3"></div>
          </div>
          <div class="row" style="height: 25px;"> <!--структурное подразделение -->
            <div class="col" style="font-size: 12px; line-height: 10px; text-align: center;">структурное подразделение</div>
          </div>
        </div>
        <div class="col-3 border" style="text-align: center;"> <!--Код 0310001 -->
          <div class="row border-bottom" style="height: 25px;">
            <div class="col">Код</div>
          </div>
          <div class="row border-bottom" style="height: 25px;">
            <div class="col">0310001</div>
          </div>
          <div class="row border-bottom" style="height: 25px;">
            <div class="col"></div>
          </div>
          <div class="row border-bottom" style="height: 25px;">
            <div class="col"></div>
          </div>
          <!-- <div class="row" style="height: 25px;">
            <div class="col"></div>
          </div> -->

        </div>
      </div>
      <div class="row mt-3"><!-- ПРИХОДНЫЙ КАССОВЫЙ ОРДЕР -->
        <div class="col" style="line-height: 4; text-align: right;"><strong>ПРИХОДНЫЙ КАССОВЫЙ ОРДЕР</strong></div>
        <div class="col-5" style="text-align: center">
          <div class="row border-top border-left border-right"> <!--Номер документа Дата составления -->
            <div class="col border-right">
              <div class="row">Номер документа</div>
            </div>
            <div class="col">
              <div class="row">Дата составления</div>
            </div>
          </div>
          <div class="row border" style="height: 25px">
            <div class="col border-right"></div>
            <div class="col"></div>
          </div>
        </div>
      </div>
      <div class="row border mt-3" style="font-size: 12px; text-align: center;"> <!--Дебет-->
        <div class="col-1" >
          <div class="row border-bottom border-right" style="height: 80px;">
            <div class="col p-0">Дебет</div>
          </div>
          <div class="row border-right">
            <div class="col" style="height: 20px;"></div>
          </div>
        </div>
        <div class="col">
          <div class="row border-bottom border-right" style="height: 80px;">
            <div class="col">
              <div class="row">
                <div class="col border-bottom">Кредит</div>
              </div>
              <div class="row" style="height: 60px;">
                <div class="col-1 border-right"></div>
                <div class="col border-right">код структурного подразделения</div>
                <div class="col border-right">корреспон-дирующий счет, субсчет</div>
                <div class="col">код аналитичес-кого учета</div>
              </div>
            </div>
          </div>
          <div class="row border-right">
            <div class="col">
              <div class="row" style="height: 20px;">
                <div class="col-1 border-right"></div>
                <div class="col border-right"></div>
                <div class="col border-right"></div>
                <div class="col"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-1 ">
          <div class="row border-bottom border-right" style="height: 80px;">
            <div class="col p-0">Сумма, руб. коп.</div>
          </div>
          <div class="row border-right">
            <div class="col" style="height: 20px;"></div>
          </div>
        </div>
        <div class="col-1 ">
          <div class="row border-bottom border-right" style="height: 80px;">
            <div class="col p-0">Код це-левого назна-чения</div>
          </div>
          <div class="row border-right">
            <div class="col" style="height: 20px;"></div>
          </div>
        </div>
        <div class="col-1">
          <div class="row border-bottom" style="height: 80px;">
            <div class="col"></div>
          </div>
          <div class="row">
            <div class="col" style="height: 20px;"></div>
          </div>
        </div>
      </div>
      <div class="row"> <!-- Принято от -->
        <div class="col-3">Принято от</div>
        <div class="col border-bottom"></div>
      </div>
      <div class="row"> <!-- Основание -->
        <div class="col-3">Основание:</div>
        <div class="col border-bottom"></div>
      </div>
      <div class="row border-bottom" style="height: 25px;"></div>
      <div class="row"> <!-- Сумма-->
        <div class="col-2">Сумма:</div>
        <div class="col border-bottom"></div>
      </div>
      <div class="row" style="font-size: 12px; line-height: 10px; text-align: center;">
        <div class="col">прописью</div>
      </div>
      <div class="row border-bottom" style="height: 20px;"></div>
      <div class="row"> <!-- В том числе-->
        <div class="col-3">В том числе</div>
        <div class="col border-bottom"></div>
      </div>
      <div class="row"> <!-- Приложение-->
        <div class="col-3">Приложение</div>
        <div class="col border-bottom"></div>
      </div>
      <div class="row"> <!-- Главный бухгалтер -->
        <div class="col-4">Главный бухгалтер</div>
        <div class="col ">
          <div class="row" style="height: 25px;">
            <div class="col-3 border-bottom mr-3"></div>
            <div class="col border-bottom"></div>
            <div class="col-2"></div>
          </div>
        </div>
      </div>
      <div class="row" style="font-size: 12px; line-height: 10px; text-align: center;">
        <div class="col-4"></div>
        <div class="col">
          <div class="row">
            <div class="col-3 mr-3">(подпись)</div>
            <div class="col">(расшифровка подписи)</div>
            <div class="col-2"></div>
          </div>
        </div>
      </div>
       <div class="row"> <!-- Получил кассир -->
        <div class="col-4">Получил кассир</div>
        <div class="col ">
          <div class="row" style="height: 25px;">
            <div class="col-3 border-bottom mr-3"></div>
            <div class="col border-bottom"></div>
            <div class="col-2"></div>
          </div>
        </div>
      </div>
      <div class="row" style="font-size: 12px; line-height: 10px; text-align: center;">
        <div class="col-4"></div>
        <div class="col">
          <div class="row">
            <div class="col-3 mr-3">(подпись)</div>
            <div class="col">(расшифровка подписи)</div>
            <div class="col-2"></div>
          </div>
        </div>
      </div>

  </div>
  <div class="col-4" style="font-size: 14px;"> <!-- Right side -->
    <div class="mt-3" style="text-align: center;"> <!--организация-->
      <div class="row" style="font-size: 18px;">
        <div class="col"><strong>{{ company.name }}</strong></div>
      </div>
      <div class="row" style="font-size: 12px;">
        <div class="col border-top">организация</div>
      </div>
    </div>
    <div class="row mt-3"> <!--КВИТАНЦИЯ-->
      <div class="col" style="text-align: center;"><strong>КВИТАНЦИЯ</strong></div>
    </div>
    <div class="row mt-3" style="height: 25px; line-height: 35px;"> <!--к приходному кассовому ордеру №-->
      <div class="col pr-0">	к приходному кассовому ордеру</div>
      <div class="col-3 p-0 border-bottom">№ {{ order.number }}</div>
    </div>
    <div class="row">  <!--от «_____»	__________________г.-->
      <div class="col border-bottom" style="height: 25px; line-height: 35px;"> от {{ date }}</div>
    </div>
    <div class="row" style="height: 30px; line-height: 40px;"> <!--Принято от-->
      <div class="col-4 pr-0">Принято от</div>
      <div class="col border-bottom">{{ klient.family }}</div>
    </div>
    <div class="row" style="height: 25px; line-height: 35px;">
      <div class="col border-bottom">{{ klient.name }} {{ klient.sername }} </div>
    </div>
    <div class="row" > <!--Основание-->
      <div class="col" style="height: 90px; line-height: 30px; overflow: hidden;">
        <div style="height: 0px;"> Основание: {{ order.title }} </div>
        <div class=" border-bottom" style="height: 25px;"></div>
        <div class=" border-bottom" style="height: 30px;"></div>
        <div class=" border-bottom" style="height: 30px;"></div>
        <div class=" border-bottom" style="height: 30px;"></div>
      </div>
    </div>
    <div class="row" style="height: 30px; line-height: 40px;"> <!--Сумма-->
      <div class="col-3 pr-0">Сумма:</div>
      <div class="col border-bottom"><strong>{{ summ }}</strong></div>
    </div>
    <div class="row"> <!--цифрами-->
      <div class="col" style="font-size: 10px; line-height: 6px; text-align: center;">цифрами</div>
      <div class="col-2"></div>
    </div>
    <div class="row" > <!--прописью-->
      <div class="col" style="height: 90px; line-height: 30px; overflow: hidden;">
        <div style="height: 0px;"><strong>{{ toWordsRu }}</strong></div>
        <div class=" border-bottom" style="height: 25px;"></div>
        <div class="row" style="font-size: 10px; line-height: 6px; text-align: center;">
          <div class="col" style="height: 0px;">прописью</div>
        </div>
        <div class=" border-bottom" style="height: 30px;"></div>
        <div class=" border-bottom" style="height: 30px;"></div>
        <div class=" border-bottom" style="height: 30px;"></div>
      </div>
    </div>
    <div class="row" style="font-size: 14px; height: 25px; line-height: 30px;"> <!--В том числе-->
      <div class="col-5 pr-0">В том числе</div>
      <div class="col border-bottom"></div>
    </div>
    <div class="row">  <!--«_____»	__________________г.-->
      <div class="col" style="height: 35px; line-height: 45px;">
        <strong class="border-bottom">{{ date }}</strong>
      </div>
    </div>
    <div class="row" style="line-height: 45px;"> <!--М. П. (штампа)-->
      <div class="col"><strong>М. П.</strong> (штампа)</div>
    </div>
    <div class="row" > <!--Главный бухгалтер-->
      <div class="col-5 pr-0">Главный бухгалтер</div>
      <div class="col">
        <div class="row" style="height: 20px;">
          <div class="col-4 pl-0 mr-2 border-bottom"></div>
          <div class="col border-bottom p-0" style="text-align: center;">{{ company.bookkeeper }}</div>
        </div>
        <div class="row" style="font-size: 10px; line-height: 10px; text-align: center;">
          <div class="col-1 mr-3">(подпись)</div>
          <div class="col p-0">(расшифровка подписи)</div>
        </div>
      </div>
    </div>
    <div class="row mt-2" > <!--Кассир-->
      <div class="col-2">Кассир</div>
      <div class="col">
        <div class="row" style="height: 20px;">
          <div class="col-3 pl-0 mr-3 border-bottom"></div>
          <div class="col border-bottom" style="text-align: center;">{{ user.name}}</div>
        </div>
        <div class="row" style="font-size: 10px; line-height: 10px; text-align: center;">
          <div class="col-1 mr-3">(подпись)</div>
          <div class="col p-0">(расшифровка подписи)</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { summ, numberFormat } from '@/functions'
import numberToWordsRu from 'number-to-words-ru';
export default {
  props: {
    date: String,
    order: Object,
    bilet: Object,
    klient: Object,
    values: Array
  },
  computed: {
    ...mapGetters({
        klients: 'klient/klients',
        company: 'company',
        user: 'user'
    }),
    summ({ values }) {
      const [ rub, kop ] = summ( ...values.map(v => v.summ)).split('.')
      return `${rub} руб. ${kop} коп.`
    },
    toWordsRu({ values }) {
      return numberToWordsRu.convert(summ( ...values.map(v => v.summ)))
    }
  }
}
</script>

<style></style>