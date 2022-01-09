<template>
  <div class="invoice">
    <div class="invoice_right">
      <div>
        <p class="invoice_date">{{date}}</p>
        <div class="invoice_tag" :style="{'background-color': invoice.status==='驗證中'?'#FF5C5C':'#FFCE33', 'color': invoice.status==='驗證中'?'white':'#37375A'}">{{invoice.status==='驗證中'? '驗證中':invoice.type === 1? '載具':'電子'}}</div>
      </div>
      <div class="invoice_product">
        <p class="invoice_product_display">{{displayInfo}}</p>
        <p class="invoice_product_seller">{{invoice.sellerName? invoice.sellerName:'無店家資料'}}</p>
      </div>
    </div>
    <div class="invoice_left">
      {{invoice.amount? invoice.amount:'--' }}元
    </div>
  </div>
</template>

<script>
export default {
  props:{
    invoice: {
      type: Object,
      required: true,
    }
  },
  name: 'InvoiceItem',
  computed:{
    date(){
      return this.invoice.time.split('-')[1]+'/'+this.invoice.time.substring(8,10)
    },
    displayInfo(){
      if(this.invoice.status === '驗證中'){
        return this.invoice.invNum
      }else{
        return this.invoice.details[0].description
      }
    }
  }
}
</script>

<style lang="scss">
.invoice{
  border-top: 1px solid #E0E0E0;
  border-bottom: 1px solid #E0E0E0;
  height: max-content;
  width: 100%;
  background-color: white;
  padding: 12px 10px 13px 8px;
  display: flex;
  justify-content: space-between;
  & + & {
    border-top: 0;
  }
  & p {
    margin: 0;
  }
  & div+div{
    margin-left: 9px;
  }
  &_right{
    display: flex;
  }
  &_left{
    font-size: 14px;
    line-height: 21px;
    display: flex;
    align-items: center;
  }
  &_date{
    font-size: 12px;
    line-height: 18px;
    color: #5A5A78;
    text-align: center;
  }
  // &_tag{
  //   font-size: 10px;
  //   line-height: 15px;
  //   text-align: center;
  //   border-radius: 8px;
  //   width: 36px;
  //   height: 16px;
  // }
  &_product{
    &_display{
      color: #37375A;
      font-size: 14px;
      line-height: 21px;
    }
    &_seller{
      color: #999999;
      font-size: 10px;
      line-height: 15px;
    }
  }
}
</style>
