<template>
  <div class="col" style="text-align: center; font-size: 12px;">
      <div class="row">
          <div class="col"></div>
          <div class="col">{{ t('header') }}</div>
      </div>
      <div class="row"><div class="col"><h3>{{ t('title1') }}</h3></div></div>
      <div class="row border" >
          <div class="col">
            <div class="row border-bottom">  <!-- Фамилия Имя Отчество -->
                <div class="col-1 border-right">1</div>
                <div class="col" style="text-align: left">{{ t('fio') }}: {{ fio }} </div>
            </div>
            <div class="row border-bottom"> <!-- Дата и место рождения -->
                <div class="col-1 border-right">2</div>
                <div class="col" style="text-align: left">{{ t('bithday') }}: {{ value.bithday }} г. {{ value.city }}</div>
                <div class="col border-left" style="text-align: left">{{ t('nationality') }}: {{ passport.nationality }}</div>
            </div>
            <div class="row border-bottom"> <!--Серия, номер паспорта и -->
                <div class="col-1 border-right">3</div>
                <div class="col" style="text-align: left">{{ t('passport') }}: {{ passportString }}</div>
            </div>
            <div class="row border-bottom"> <!--document-->
                <div class="col-1 border-right">4</div>
                <div class="col" style="text-align: left">{{ t('document') }}: </div>
            </div>
            <div class="row border-bottom"> <!--Регистрационный номер, телефон -->
                <div class="col-1 border-right">5</div>
                <div class="col" style="text-align: left">{{ t('idn') }}: {{ passport.idn }} </div>
                <div class="col border-left" style="text-align: left">{{ t('phone') }}: {{ address.phone }}</div>
            </div>
            <div class="row border-bottom"> <!--address1 -->
                <div class="col-1 border-right">6</div>
                <div class="col" style="text-align: left">{{ t('address1') }}: {{ addressString }}</div>
            </div>
            <div class="row border-bottom"> <!--Цель обращения -->
                <div class="col-1 border-right">7</div>
                <div class="col" style="text-align: left">{{ t('objective of referral') }}: </div>
                <div class="col-1 border-left" style="text-align: left">{{ get('objective of referral', 'receive financial credit') }}</div>
                <div class="col border-left" style="text-align: left">{{ t('receive financial credit') }}</div>
                <div class="col-1 border-left" style="text-align: left">{{ get('objective of referral', 'another') }}</div>
                <div class="col border-left" style="text-align: left">{{ t('another') }}</div>
            </div>
            <div class="row border-bottom"> <!--Информация относительна источника поступления денежных -->
                <div class="col-1 border-right">8</div>
                <div class="col" style="text-align: left">{{ t('source of money') }}: </div>
                <div class="col border-left" style="text-align: left">
                    <div class="row border-bottom">
                        <div class="col">
                            <div class="row ">
                                <div class="col-1 border-right">{{ get('source of money', 'salary') }}</div>
                                <div class="col border-right">{{ t('salary') }}</div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="row ">
                                <div class="col-1 border-right">{{ get('source of money', 'social payments') }}</div>
                                <div class="col">{{ t('social payments') }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="row ">
                                <div class="col-1 border-right">{{ get('source of money', 'pension') }}</div>
                                <div class="col border-right">{{ t('pension') }}</div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="row ">
                                <div class="col-1 border-right">{{ get('source of money', 'another') }}</div>
                                <div class="col">{{ t('another') }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row border-bottom"> <!--Среднемесячный доход -->
                <div class="col-1 border-right"></div>
                <div class="col-3" style="text-align: left">{{ t('average monthly income') }}: </div>
                <div class="col border-left" style="text-align: left">
                    <div class="row border-bottom">
                        <div class="col">
                            <div class="row ">
                                <div class="col-1 border-right">{{ get('average monthly income', 'income1') }}</div>
                                <div class="col border-right">{{ t('income1') }}</div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="row ">
                                <div class="col-1 border-right">{{ get('average monthly income', 'income2') }}</div>
                                <div class="col">{{ t('income2') }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="row ">
                                <div class="col-1 border-right">{{ get('average monthly income', 'income3') }}</div>
                                <div class="col border-right">{{ t('income3') }}</div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="row ">
                                <div class="col-1 border-right">{{ get('average monthly income', 'income4') }}</div>
                                <div class="col">{{ t('income4') }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row border-bottom"> <!--Характеристика фин-го состояния -->
                <div class="col-1 border-right">9</div>
                <div class="col-3" style="text-align: left">{{ t('financial status type') }}: </div>
                <div class="col border-left" style="text-align: left">
                    <div class="row border-bottom">
                        <div class="col">
                            <div class="row ">
                                <div class="col-1 border-right">{{ get('financial status type', 'movable and immovable property') }}</div>
                                <div class="col border-right">{{ t('movable and immovable property') }}</div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="row ">
                                <div class="col-1 border-right">{{ get('financial status type', 'household saving') }}</div>
                                <div class="col">{{ t('household saving') }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="row ">
                                <div class="col-1 border-right">{{ get('financial status type', 'property rights') }}</div>
                                <div class="col border-right">{{ t('property rights') }}</div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="row ">
                                <div class="col-1 border-right">{{ get('financial status type', 'another') }}</div>
                                <div class="col">{{ t('another') }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row border-bottom"> <!--business reputation -->
                <div class="col-1 border-right">10</div>
                <div class="col-3" style="text-align: left">{{ t('business reputation') }}: </div>
                <div class="col border-left " style="text-align: left">
                    <div class="row border-bottom ">
                        <div class="col border-right">
                            <div class="row ">
                                <div class="col-1 border-right">{{ get('business reputation', 'positive') }}</div>
                                <div class="col ">{{ t('positive') }}</div>
                            </div>
                        </div>
                        <div class="col ">
                            <div class="row">
                                <div class="col-1 border-right">{{ get('business reputation', 'part in the proceedings') }}</div>
                                <div class="col">{{ t('part in the proceedings') }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col border-right">
                            <div class="row ">
                                <div class="col-1 border-right">{{ get('business reputation', 'negative reports') }}</div>
                                <div class="col ">{{ t('negative reports') }}: </div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="row ">
                                <div class="col-1 border-right">{{ get('business reputation', 'measures to influence') }}</div>
                                <div class="col">{{ t('measures to influence') }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row border-bottom"> <!--beneficial -->
                <div class="col-1 border-right">11</div>
                <div class="col-3" style="text-align: left">{{ t('beneficial') }}: </div>
                <div class="col border-left" style="text-align: left">
                    <div class="row">
                        <div class="col">
                            <div class="row ">
                                <div class="col-1 border-right">{{ get('beneficial', 'do not have third-party benefits') }}</div>
                                <div class="col border-right">{{ t('do not have third-party benefits') }}</div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="row ">
                                <div class="col-1 border-right">{{ get('beneficial', 'have third-party benefits') }}</div>
                                <div class="col">{{ t('have third-party benefits') }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row border-bottom"> <!--beneficial owner -->
                <div class="col-1 border-right">12</div>
                <div class="col-3" style="text-align: left">{{ t('beneficial owner') }}: </div>
                <div class="col border-left" style="text-align: left">
                    <div class="row">
                        <div class="col">
                            <div class="row ">
                                <div class="col-1 border-right">{{ get('beneficial owner', 'do not have third-party owner') }}</div>
                                <div class="col border-right">{{ t('do not have third-party owner') }}</div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="row ">
                                <div class="col-1 border-right">{{ get('beneficial owner', 'have third-party owner') }}</div>
                                <div class="col">{{ t('have third-party owner') }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row border-bottom"> <!--public official -->
                <div class="col-1 border-right">13</div>
                <div class="col-3" style="text-align: left">{{ t('public official info') }}: </div>
                <div class="col border-left" style="text-align: left">
                    <div class="row">
                        <div class="col">
                            <div class="row ">
                                <div class="col-1 border-right">{{ get('public official', 'not public official') }}</div>
                                <div class="col border-right">{{ t('not public official') }}</div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="row ">
                                <div class="col-1 border-right">{{ get('public official', 'public official') }}</div>
                                <div class="col">{{ t('public official') }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row border-bottom"> <!--information about representative -->
                <div class="col-1 border-right">14</div>
                <div class="col-3" style="text-align: left">{{ t('information about representative') }}:</div>
                <div class="col border-left" style="text-align: left">
                    <div class="row">
                        <div class="col">
                            <div class="row ">
                                <div class="col-1 border-right">{{ get('information about representative', 'have') }}</div>
                                <div class="col border-right">{{ t('have') }}</div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="row ">
                                <div class="col-1 border-right">{{ get('information about representative', 'do not have') }}</div>
                                <div class="col">{{ t('do not have') }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row border-bottom"> <!--level risk -->
                <div class="col-1 border-right">15</div>
                <div class="col-3" style="text-align: left">{{ t('level risk') }}:</div>
                <div class="col border-left" style="text-align: left">
                    <div class="row">
                        <div class="col">
                            <div class="row ">
                                <div class="col-1 border-right">{{ get('level risk', 'low') }}</div>
                                <div class="col border-right">{{ t('low') }}</div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="row ">
                                <div class="col-1 border-right">{{ get('level risk', 'midle') }}</div>
                                <div class="col border-right">{{ t('midle') }}</div>
                            </div>
                        </div>
                        <div class="col">
                            <div class="row ">
                                <div class="col-1 border-right">{{ get('level risk', 'high') }}</div>
                                <div class="col">{{ t('high') }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row border-bottom"> <!--footer1 -->
                <div class="col-1 border-right">15.1</div>
                <div class="col" style="text-align: left">
                    <div class="row">
                        <div class="col">{{ t('footer1') }}</div>
                    </div>
                </div>
            </div>
            <div class="row"> <!--footer2 -->
                <div class="col-1 border-right">15.2</div>
                <div class="col" style="text-align: left">
                    <div class="row">
                        <div class="col">{{ t('footer2') }}</div>
                    </div>
                </div>
            </div>
          </div>
      </div>
          <div class="row mt-5"> <!--user sign date -->
              <div class="col-7">
                  <div class="row">
                      <div class="col">{{ user.post }}</div>
                      <div class="col">{{ userFio }}</div>
                      <div class="col border-bottom"></div>
                  </div>
              </div>
              <div class="col">{{ t('date1') }} {{ date }} г.  </div>
          </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { moment } from '@/functions'
export default {
    props: { value: Object },
    computed: {
        ...mapGetters({ usersMap: 'usersMap' }),
        questionnaire({ value }) {
            return {...value.questionnaire}
        },
        user({ value, usersMap }){
            const { user } = {...value}
            return {...usersMap[user]}
        },
        date({ value }) {
            return moment(value.date).format('L')
        },
        fio({ value }) {
            const { family = '', name = '', sername = '' } = {...value}
            return `${family} ${name} ${sername}`
        },
        address({ value }) {
            return {...value.address }
        },
        addressString({ address }) {
            const { city = '', street = '', home = '' } = address
            return `${city} ${street} ${home}`
        },
        passport({ value }) {
            return {...value.passport }
        },
        passportString({ passport }) {
            const { seria = '', number = '', issued = '' } = passport
            return `${seria} ${number} выдан ${issued} ${passport['date-issue']} г.`
        },
        userFio({ user }) {
            const { family = '', name = '', sername = '' } = {...user.fio}
            return `${family} ${name.charAt(0)}. ${sername.charAt(0)}`
        },
    },
    methods: {
        get(name, value) {
            return this.questionnaire[name] === value ? 'x' : ''
        },
        t(v) {
            return this.$t(`questionnaire.${v}`)
        }
    }
}
</script>

<style>

</style>