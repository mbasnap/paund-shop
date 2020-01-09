<template>
<div class="row p-3">
  <div class="col p-4">
    <div class="row"> <!-- Унифицированная форма № КО-2 -->
      <div class="col" style="font-size: 12px; text-align: right;">
        Унифицированная форма № КО-2 Утверждена постановлением Госкомстата от 18.08.98 № 88
      </div>
    </div>
    <div class="row"> <!-- Код -->
      <div class="col-10"></div>
      <div class="col border-top border-left border-right" style="text-align: center;">Код</div>
    </div>
    <div class="row"> <!-- Форма по ОКУД -->
       <div class="col"></div> 
      <div class="col-3" style="text-align: right;">Форма по ОКУД</div>
      <div class="col-2 border-top border-left border-right" style="text-align: center;">0310002</div>
    </div>
    <div class="row"> <!-- по ОКПО -->
      <div class="col"></div>
      <div class="col-3" style="text-align: right;">по ОКПО</div>
      <div class="col-2 border-top border-left border-right"></div>
    </div>
    <div class="row mb-3"> <!-- организация -->
      <div class="col border-top" style="text-align: center; font-size: 12px;">организация</div>
      <div class="col-3"></div>
      <div class="col-2 border" style="height: 25px;"></div>
    </div>
    <div class="row"> <!-- структурное подразделение -->
      <div class="col border-top" style="text-align: center; font-size: 12px;">структурное подразделение</div>
      <div class="col-5"></div>
    </div>
    <div class="row"> <!-- Номер документа Дата составления -->
      <div class="col"></div>
      <div class="col-5 border-top border-left border-right">
        <div class="row " style="font-size: 12px; text-align: center;">
          <div class="col border-right">Номер документа</div>
          <div class="col">Дата составления</div>
        </div>
      </div>
    </div>
    <div class="row mb-2"> <!-- РАСХОДНЫЙ КАССОВЫЙ ОРДЕР -->
      <div class="col" style="text-align: right;"> РАСХОДНЫЙ КАССОВЫЙ ОРДЕР </div>
      <div class="col-5 border">
        <div class="row " style="height: 25px;">
          <div class="col border-right"></div>
          <div class="col"></div>
        </div>
      </div>
    </div>
    <div class="row border"> <!-- Дебет -->
      <div class="col border-right">
        <div class="row border-bottom">
          <div class="col" style="text-align: center; height: 30px;">Дебет</div>
        </div>
        <div class="row" style="font-size: 10px; text-align: center;">
          <div class="col-1 border-right"></div>
          <div class="col border-right">код структурного подразделения</div>
          <div class="col border-right">корреспондирующий счет, субсчет</div>
          <div class="col">код аналитического учета</div>
        </div>
        <div class="row border-bottom">
          <div class="col-1 border-right"></div>
          <div class="col border-right"></div>
          <div class="col border-right"></div>
          <div class="col"></div>
        </div>
      </div>
      <div class="col">
        <div class="row" style="font-size: 10px; text-align: center; height: 30px;">
          <div class="col border-right">Кредит</div>
          <div class="col border-right">Сумма,<br /> руб. коп.</div>
          <div class="col border-right">Код целевого<br /> назначения</div>
          <div class="col-1"></div>
        </div>
        <div class="row border-top" style="height: 45px;">
          <div class="col border-right"></div>
          <div class="col border-right"></div>
          <div class="col border-right"></div>
          <div class="col-1"></div>
        </div>
      </div>
    </div>
    <div class="row"> <!-- Выдать -->
      <div class="col-2">Выдать:</div>
      <div class="col border-bottom"></div>
    </div>
    <div class="row"> <!-- фамилия, имя, отчество -->
      <div class="col" style="text-align: center; font-size: 10px;">фамилия, имя, отчество</div>
    </div>
    <div class="row"> <!-- Основание -->
      <div class="col-2">Основание:</div>
      <div class="col border-bottom"></div>
    </div>
    <div class="row"> <!-- Сумма -->
      <div class="col-2">Сумма:</div>
      <div class="col border-bottom"></div>
    </div>
    <div class="row"> <!-- руб коп -->
      <div class="col-2" style="height: 25px;"></div>
      <div class="col border-bottom"></div>
    </div>
    <div class="row"> <!-- Приложение -->
      <div class="col-2">Приложение:</div>
      <div class="col border-bottom"></div>
    </div>
    <div class="row"> <!-- Руководитель организации -->
      <div class="col-4">Руководитель организации</div>
      <div class="col">
        <div class="row" style="height: 25px;">
          <div class="col mr-3 border-bottom"></div>
          <div class="col mr-3 border-bottom"></div>
          <div class="col border-bottom"></div>
        </div>
      </div>
    </div>
    <div class="row"> <!-- должность подпись расшифровка подписи -->
      <div class="col-4"></div>
      <div class="col">
        <div class="row" style="font-size: 10px; text-align: center;">
          <div class="col mr-3">должность</div>
          <div class="col mr-3">подпись</div>
          <div class="col">расшифровка подписи</div>
        </div>
      </div>
    </div>
    <div class="row"> <!-- Главный бухгалтер -->
      <div class="col-3">Главный бухгалтер</div>
      <div class="col">
        <div class="row" style="height: 25px;">
          <div class="col mr-3 border-bottom"></div>
          <div class="col border-bottom"></div>
          <div class="col"></div>
        </div>
      </div>
    </div>
    <div class="row"> <!-- подпись расшифровка подписи -->
      <div class="col-3"></div>
      <div class="col">
        <div class="row" style="font-size: 10px; text-align: center;">
          <div class="col mr-3">подпись</div>
          <div class="col">расшифровка подписи</div>
          <div class="col"></div>
        </div>
      </div>
    </div>
    <div class="row"> <!-- Получил -->
      <div class="col-2">Получил:</div>
      <div class="col border-bottom"></div>
    </div>
    <div class="row"> <!-- руб коп -->
      <div class="col-2" style="height: 25px;"></div>
      <div class="col border-bottom"></div>
    </div>
    <div class="row mt-2"> <!-- "_____" _________________ г  Подпись -->
      <div class="col">"_____" _________________ г.</div>
      <div class="col">Подпись _________________</div>
      <div class="col"></div>
    </div>
    <div class="row"> <!-- По -->
      <div class="col-1">По</div>
      <div class="col border-bottom"></div>
    </div>
    <div class="row"> <!-- наименование, номер, дата, и место выдачи -->
      <div class="col-1"></div>
      <div class="col" style="text-align: center; font-size: 12px;">наименование, номер, дата, и место выдачи документа, удостоверяющего личность получателя</div>
    </div>
    <div class="row"> <!-- Выдал кассир -->
      <div class="col-3">Выдал кассир</div>
      <div class="col">
        <div class="row" style="height: 25px;">
          <div class="col mr-3 border-bottom"></div>
          <div class="col border-bottom"></div>
          <div class="col"></div>
        </div>
      </div>
    </div>
    <div class="row"> <!-- подпись расшифровка подписи -->
      <div class="col-3"></div>
      <div class="col">
        <div class="row" style="font-size: 10px; text-align: center;">
          <div class="col mr-3">подпись</div>
          <div class="col">расшифровка подписи</div>
          <div class="col"></div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>