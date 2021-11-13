<template>
  <div class="p-4">
    <div class="row">
      <div class="col">
        <div class="row" style=""> 
          <div class="col" style="text-align: center;">
            <div><strong>{{ company.title }}</strong></div>
            <div class="border-top" style="font-style: italic; font-size: 10px; text-align: center;">
              (юридическое лицо предпринематель)
            </div>
            <div class="mt-2 border-top" style="font-style: italic; font-size: 10px; text-align: center;">
              (структурное подразделение)
            </div>    
          </div>
          <div class="col-1 pt-3" style="text-align: right; font-size: 12px;">ИНН</div>
          <div class="col-2 p-0 border" style="text-align: center; font-size: 12px;">
            <div class="border-bottom" style="height: 20px;">КОД</div>
            <div class="border-bottom" style="height: 20px;">{{ depKod }}</div>
            <div style="height: 20px;"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-2"> <!-- Номер документа Дата составления -->
      <div class="col"></div>
      <div class="col-5 border-top border-left border-right">
        <div class="row " style="font-size: 12px; text-align: center;">
          <div class="col-5 p-0 border-right">Номер документа</div>
          <div class="col p-0">Дата составления</div>
        </div>
      </div>
    </div>
    <div class="row mb-2"> <!-- РАСХОДНЫЙ КАССОВЫЙ ОРДЕР -->
      <div class="col" style="text-align: center;">
        <strong>РАСХОДНЫЙ КАССОВЫЙ ОРДЕР </strong>
      </div>
      <div class="col-5 border">
        <div class="row " style="font-size: 12px; height: 25px; text-align: center;">
          <div class="col-5 p-0 border-right">
            <!-- <strong>№ {{order.ct}}</strong> -->
          </div>
          <div class="col p-0">{{date}}</div>
        </div>
      </div>
    </div>
    <div class="row border" style="font-size: 10px; text-align: center;"> <!-- Дебет -->
      <div class="col border-right">
        <div class="row border-bottom">
          <div class="col" style="height: 30px;">Дебет</div>
        </div>
        <div class="row" style="font-size: 10px; text-align: center;">
          <div class="border-right border-bottom" style="width: 20px"></div>
          <div class="col-3 p-0 border-right border-bottom">
            код структурного подразделения
          </div>
          <div class="col p-0 border-right border-bottom">
            корреспондирующий счет, субсчет
          </div>
          <div class="col-3 p-0 border-bottom" style="font-size: 9px;">
            код аналитического учета
          </div>
        </div>
        <div v-for="(v, i) in values" :key="i" class="row" style="text-align: center; height: 20px; font-size: 12px;">
          <div class="border-right" style="width: 20px"></div>
          <div class="col-3 p-0 border-right"><span>{{depKod}}</span></div>
          <div class="col p-0 border-right"><span>{{getAccount(v)}}</span></div>
          <div class="col-3 p-0"></div>
        </div>
      </div>
      <div class="col">
        <div class="row" style="font-size: 12px; text-align: center; height: 60px;">
          <div class="col-3 p-0 border-right">Кредит</div>
          <div class="col p-0 border-right">Сумма,<br /> руб. коп.</div>
          <div class="col-3 p-0 border-right">Код целевого<br /> назначения</div>
          <div class="col-1"></div>
        </div>
        <div v-for="(v, i) in values" :key="i" class="row border-top" style="height: 20px; font-size: 12px;">
          <div class="col-3 p-0 border-right">301</div>
          <div class="col p-0 border-right">{{ short(v.summ) }}</div>
          <div class="col-3 p-0 border-right"></div>
          <div class="col-1"></div>
        </div>
      </div>
    </div>
    <div class="row"> <!-- Выдать -->
      <div class="col-2">Выдать:</div>
      <div class="col p-0 border-bottom" style="font-size: 14px;">{{ fullName }}</div>
    </div>
    <div class="row"> <!-- фамилия, имя, отчество -->
      <div class="col" style="font-style: italic; font-size: 10px; text-align: center;">
        (фамилия, имя, отчество)
      </div>
    </div>
    <div class="row"> <!-- Основание -->
      <div class="col-2">Основание:</div>
      <div class="col border-bottom" style="font-size: 14px;">
        {{ purposeOfPayment}}
      </div>
    </div>
    <div class="row"> <!-- Сумма -->
      <div class="col-2">Сумма:</div>
      <div class="col border-bottom" style="font-size: 14px;">{{ toWordsRu }}</div>
    </div>
    <div class="row">
      <div class="col" style="font-style: italic; font-size: 10px; text-align: center;">
        (прописью)
      </div>
    </div>    
    <div class="row" style="font-size: 10px; margin-top: -12px;"> 
      <div class="col-2"></div>
      <div class="col border-bottom"></div>
      <div class="col-1">руб.</div>
      <div class="col-1 border-bottom"></div>
      <div class="col-1 p-0" style="text-align: right;">коп.</div>
    </div>
    <div class="row" style="margin-top: -6px;"> <!-- Приложение -->
      <div class="col-2">Приложение:</div>
      <div class="col border-bottom"></div>
    </div>
    <div class="row" style="height: 20px">
      <div class="col-2"></div>
      <div class="col border-bottom"></div>
    </div>
    <div class="row"> <!-- Руководитель организации -->
      <div class="col-3">Руководитель</div>
      <div class="col">
        <div class="row" style="height: 25px; text-align: center;">
          <div class="col mr-3 border-bottom">директор</div>
          <div class="col mr-3 border-bottom"></div>
          <div class="col border-bottom">{{ company.director }}</div>
        </div>
      </div>
    </div>
    <div class="row"> <!-- должность подпись расшифровка подписи -->
      <div class="col-3"></div>
      <div class="col">
        <div class="row" style="font-style: italic; font-size: 10px; text-align: center;">
          <div class="col mr-3">(должность)</div>
          <div class="col mr-3">(подпись)</div>
          <div class="col">(расшифровка подписи)</div>
        </div>
      </div>
    </div>
    <div class="row"> <!-- Главный бухгалтер -->
      <div class="col-3">Главный бухгалтер</div>
      <div class="col">
        <div class="row" style="height: 25px;">
          <div class="col mr-3 border-bottom"></div>
          <div class="col border-bottom">{{ company.bookkeeper }}</div>
          <div class="col"></div>
        </div>
      </div>
    </div>
    <div class="row"> <!-- подпись расшифровка подписи -->
      <div class="col-3"></div>
      <div class="col">
        <div class="row" style="font-style: italic; font-size: 10px; text-align: center;">
          <div class="col mr-3">(подпись)</div>
          <div class="col">(расшифровка подписи)</div>
          <div class="col"></div>
        </div>
      </div>
    </div>
    <div class="row"> <!-- Получил -->
      <div class="col-2">Получил:</div>
<div class="col border-bottom" style="font-size: 14px;">{{ toWordsRu }}</div>
    </div>
    <div class="row" style="font-style: italic; font-size: 10px; text-align: center;">
      <div class="col">
        (сумма прописью)
      </div>
    </div>    
    <div class="row" style="font-size: 10px; margin-top: -10px;"> 
      <div class="col-2"></div>
      <div class="col border-bottom"></div>
      <div class="col-1">руб.</div>
      <div class="col-1 border-bottom"></div>
      <div class="col-1 p-0" style="max-width: 10px; text-align: right">коп.</div>
    </div>
    <div class="row mt-3" style="font-size: 12px">
      <div class="col-3 p-0 border-bottom" style="text-align: center;">{{date}}</div>
      <div class="col-1">Подпись</div>
      <div class="col-4 border-bottom"></div>
    </div>
    <div class="row mt-2"> <!-- По -->
      <div class="col-1">По</div>
      <div class="col border-bottom" style="font-size: 14px; height: 18px;">
        {{ docToString }}
      </div>
    </div>
    <div class="row" style="margin-top: -8px;">
      <div class="col-1"></div>
      <div class="col" style="font-style: italic; font-size: 10px; text-align: center;">
        (наименование, номер, дата, и место выдачи документа, удостоверяющего личность получателя)
      </div>
    </div>
    <div class="row"> <!-- Выдал кассир -->
      <div class="col-3">Выдал кассир</div>
      <div class="col">
        <div class="row" style="height: 25px;">
          <div class="col mr-3 border-bottom"></div>
          <div class="col border-bottom">{{ kassir }}</div>
          <div class="col"></div>
        </div>
      </div>
    </div>
    <div class="row"> <!-- подпись расшифровка подписи -->
      <div class="col-3"></div>
      <div class="col">
        <div class="row" style="font-style: italic; font-size: 10px; text-align: center;">
          <div class="col mr-3">(подпись)</div>
          <div class="col">(расшифровка подписи)</div>
          <div class="col"></div>
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
    type: 'ct'
  })
}
</script>

<style>

</style>