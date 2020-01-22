<template>
<div class="row p-3">
  <div class="col border-right" style="font-size: 14px;"> <!--Left side-->
      <div class="row" style="font-size: 12px;"> <!--Унифицированная форма № КО-1 -->
        <div class="col" style="text-align: right; line-height: 0px;">
          <p>Унифицированная форма № КО-1</p>
          <p>Утверждена постановлением Госкомстата</p>
          <p>России от 18.08.98 г. №88</p>
        </div>
      </div>
    <div class="row pr-3" style="font-size: 12px;"> <!--по ОКПО Форма по ОКУД -->
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
      </div>
    </div>
    <div class="row pr-3 mt-3"><!-- ПРИХОДНЫЙ КАССОВЫЙ ОРДЕР -->
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
    <div style="height: 160px;">
      <table  border="1" style="border: 1px solid; border-color: #b3b1b1;">
        <tbody>
          <tr>
            <td rowspan="2">
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
            <td style="width: 80px; text-align: center;" rowspan="2">
              Код це-левого назна-чения
            </td>
            <td style="width: 47px; text-align: center;" rowspan="2">
              &nbsp;
            </td>
          </tr>
          <tr>
            <td style="width: 78px; text-align: center;">
              &nbsp;
            </td>
            <td style="width: 140px; text-align: center;">
              код структурного подразделения
            </td>
            <td style="width: 93px; text-align: center;">
              корреспон-дирующий счет,&nbsp;
            </td>
            <td style="width: 93px; text-align: center;">
              код аналитичес-кого учета
            </td>
          </tr>
          <tr v-for="(v, i) in values" :key="i" style="border-bottom: none">
              <td style="width: 59px; text-align: center;">
                <span v-if="i===0">{{acc301}}</span>
              </td>
              <td style="width: 78px; text-align: center;">&nbsp;</td>
              <td style="width: 140px; text-align: center;">
                <span v-if="i===0">{{depKod}}</span>
              </td>
              <td style="width: 93px; text-align: center;" colspan="2">
                <span>{{getAccount(v)}}</span>
              </td>
              <td class="pl-1" colspan="2" style="max-width: 150px; white-space: nowrap;">
                {{ short(v.summ)}}
              </td>
              <td style="width: 47px; text-align: center;">&nbsp;</td>
          </tr>
        </tbody>
      </table>
    </div>


  <div class="pr-3" style="font-size: 16px">
      <div class="row"> <!-- Принято от -->
        <div class="col-3">Принято от</div>
        <div class="col border-bottom">{{fullName}}</div>
      </div>

      <div class="row" > <!--Основание-->
        <div class="col" style="height: 55px; line-height: 28px; overflow: hidden;">
          <div style="height: 0px;"> Основание: {{ value.title }} </div>
          <div class=" border-bottom" style="height: 25px;"></div>
          <div class=" border-bottom" style="height: 25px;"></div>
        </div>
      </div>
      <div class="row" > <!--Сумма-->
        <div class="col" style="height: 55px; line-height: 28px; overflow: hidden;">
          <div style="height: 0px;"> Сумма: {{ toWordsRu }} </div>
          <div class=" border-bottom" style="height: 25px;"></div>
          <div class="col" style="font-size: 12px; font-style: italic; height: 0px; line-height: 8px; text-align: center;">прописью</div>
          <div class=" border-bottom" style="height: 25px;"></div>
        </div>
      </div>
      <div class="row"> <!-- В том числе-->
        <div class="col-3">В том числе</div>
        <div class="col border-bottom"></div>
      </div>
      <div class="row mb-2"> <!-- Приложение-->
        <div class="col-3">Приложение</div>
        <div class="col border-bottom"></div>
      </div>
      <div class="row"> <!-- Главный бухгалтер -->
        <div class="col-4">Главный бухгалтер</div>
        <div class="col ">
          <div class="row" style="height: 25px; text-align: center;">
            <div class="col-3 border-bottom mr-3"></div>
            <div class="col border-bottom">{{ company.bookkeeper }}</div>
            <!-- <div class="col-2"></div> -->
          </div>
        </div>
      </div>
      <div class="row" style="font-size: 12px; line-height: 10px; text-align: center;">
        <div class="col-4"></div>
        <div class="col">
          <div class="row">
            <div class="col-3 mr-3">(подпись)</div>
            <div class="col">(расшифровка подписи)</div>
            <!-- <div class="col-2"></div> -->
          </div>
        </div>
      </div>
       <div class="row"> <!-- Получил кассир -->
        <div class="col-4">Получил кассир</div>
        <div class="col ">
          <div class="row" style="height: 25px; text-align: center;">
            <div class="col-3 border-bottom mr-3"></div>
            <div class="col border-bottom">{{ user.name}}</div>
            <!-- <div class="col-2">{{ user.name}}</div> -->
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

  </div>
  <div class="col-4" style="font-size: 14px;"> <!-- Right side -->
    <div class="mt-3" style="text-align: center;"> <!--организация-->
      <div class="row" style="font-size: 18px;">
        <div class="col"><strong>{{ company.name }}</strong></div>
      </div>
      <div class="row" style="font-size: 12px;"> <!--организация-->
        <div class="col border-top">организация</div>
      </div>
    </div>
    <div class="row mt-3"> <!--КВИТАНЦИЯ-->
      <div class="col" style="text-align: center;"><strong>КВИТАНЦИЯ</strong></div>
    </div>
    <div class="row mt-3" style="height: 25px; line-height: 35px;"> <!--к приходному кассовому ордеру №-->
      <div class="col pr-0">	к приходному кассовому ордеру</div>
      <div class="col-3 p-0 border-bottom">№ {{ value.number }}</div>
    </div>
    <div class="row" style="font-size: 16px;">  <!--от «_____»	__________________г.-->
      <div class="col border-bottom" style="height: 25px; line-height: 35px;"> от {{ date }}</div>
    </div>

    <div class="row" style="font-size: 16px;"> <!--Принято от:-->
      <div class="col" style="height: 90px; line-height: 30px; overflow: hidden;">
        <div style="height: 0px;"> Принято от: {{ fullName }} </div>
        <div class=" border-bottom" style="height: 25px;"></div>
        <div class=" border-bottom" style="height: 30px;"></div>
      </div>
    </div>
    <div class="row" > <!--Основание-->
      <div class="col" style="height: 90px; line-height: 30px; overflow: hidden;">
        <div style="height: 0px;"> Основание: {{ value.title }} </div>
        <div class=" border-bottom" style="height: 25px;"></div>
        <div class=" border-bottom" style="height: 30px;"></div>
        <div class=" border-bottom" style="height: 30px;"></div>
        <div class=" border-bottom" style="height: 30px;"></div>
      </div>
    </div>
    <div class="row" style="height: 30px; line-height: 40px;"> <!--Сумма-->
      <div class="col-3 pr-0">Сумма:</div>
      <div class="col border-bottom">{{ short(summ) }}</div>
    </div>
    <div class="row"> <!--цифрами-->
      <div class="col" style="font-size: 10px; line-height: 6px; text-align: center;">цифрами</div>
      <div class="col-2"></div>
    </div>
    <div class="row" > <!--прописью-->
      <div class="col" style="height: 90px; line-height: 30px; overflow: hidden;">
        <div style="height: 0px;">{{ toWordsRu }}</div>
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
    value: Object
  },
  computed: {
    ...mapGetters({
        company: 'company',
        user: 'user',
        accounts: 'accounts'
    }),
    acc301() {
      return '301'
    },
    depKod() {
      return '018120'
    },
    values({value}) {
      return value.values
    },
    summ({ values }) {
      return summ( ...values.map(v => v.summ))
    },
    toWordsRu({ values }) {
      return numberToWordsRu.convert(this.summ)
    },
    fullName({ value }) {
      return value.from
    }
  },
  methods: {
    getAccount({ct}) {
      const { ct: accounts } = this.accounts
      return `${ct}/${accounts[ct]}`
    },
    short(v) {
      const [ rub, kop ] = v.split('.') || []
      return `${rub} руб. ${kop} коп.`
    },
  }
}
</script>

<style></style>