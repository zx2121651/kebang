<template>
  <el-drawer
    v-model="visible"
    :title="`运单详情 - ${detailData?.shipNo || ''}`"
    size="680px"
    class="tms-detail-drawer"
    destroy-on-close
  >
    <div v-if="detailData" class="drawer-content">
      <!-- 顶部基础摘要卡 -->
      <div class="summary-card">
        <div class="summary-row">
          <div class="item">
            <span class="label">运单号：</span>
            <strong class="val highlight">{{ detailData.shipNo }}</strong>
          </div>
          <div class="item">
            <span class="label">当前状态：</span>
            <el-tag :type="getStatusType(detailData.status)">{{ detailData.status }}</el-tag>
          </div>
          <div class="item">
            <span class="label">托运日期：</span>
            <span class="val">{{ detailData.shipDate }}</span>
          </div>
        </div>

        <div class="route-banner">
          <div class="station">
            <span class="city">{{ detailData.startCity || '广州' }}</span>
            <span class="net">{{ detailData.startNetwork || '总部' }}</span>
          </div>
          <div class="arrow-wrap">
            <span class="line-name">{{ detailData.lineName || '专线直达' }}</span>
            <el-icon><Right /></el-icon>
          </div>
          <div class="station">
            <span class="city">{{ detailData.destCity || '北京' }}</span>
            <span class="net">{{ detailData.destNetwork || '北京网点' }}</span>
          </div>
        </div>
      </div>

      <!-- 收发人两栏卡 -->
      <div class="parties-card">
        <div class="party-col">
          <div class="party-header sender">
            <el-icon><Location /></el-icon>
            <span>发货方信息</span>
          </div>
          <div class="party-body">
            <p><strong>联系人：</strong>{{ detailData.senderName || '张建国' }}</p>
            <p><strong>电 话：</strong>{{ detailData.senderPhone || '13800138000' }}</p>
            <p><strong>单 位：</strong>{{ detailData.senderCompany || '广州顺达汽配实业有限公司' }}</p>
            <p><strong>地 址：</strong>{{ detailData.senderAddress || '白云区石井街道大冈物流园A区12栋' }}</p>
          </div>
        </div>

        <div class="party-col">
          <div class="party-header receiver">
            <el-icon><Position /></el-icon>
            <span>收货方信息</span>
          </div>
          <div class="party-body">
            <p><strong>联系人：</strong>{{ detailData.receiverName || '李强' }}</p>
            <p><strong>电 话：</strong>{{ detailData.receiverPhone || '13911223344' }}</p>
            <p><strong>单 位：</strong>{{ detailData.receiverCompany || '北京京顺汽贸配件中心' }}</p>
            <p><strong>地 址：</strong>{{ detailData.receiverAddress || '大兴区黄村镇北方汽配物流园C区3号' }}</p>
          </div>
        </div>
      </div>

      <!-- 货物与费用明细 -->
      <div class="detail-section">
        <h4 class="section-title">货物与费用核算</h4>
        <el-descriptions :column="3" border size="small">
          <el-descriptions-item label="货物名称">{{ detailData.goodsName || '汽车配件' }}</el-descriptions-item>
          <el-descriptions-item label="包装方式">{{ detailData.pack || '纸箱/打托' }}</el-descriptions-item>
          <el-descriptions-item label="件数">{{ detailData.qty || 50 }} 件</el-descriptions-item>
          <el-descriptions-item label="重量">{{ detailData.weight || 680 }} kg</el-descriptions-item>
          <el-descriptions-item label="体积">{{ detailData.volume || 3.2 }} m³</el-descriptions-item>
          <el-descriptions-item label="结算方式">{{ detailData.settleType || '现付' }}</el-descriptions-item>
          <el-descriptions-item label="基本运费">¥{{ Number(detailData.freight || 450).toFixed(2) }}</el-descriptions-item>
          <el-descriptions-item label="送货费">¥{{ Number(detailData.deliverFee || 50).toFixed(2) }}</el-descriptions-item>
          <el-descriptions-item label="运费总计">
            <strong style="color: #f56c6c;">¥{{ Number(detailData.totalFee || 500).toFixed(2) }}</strong>
          </el-descriptions-item>
        </el-descriptions>
      </div>

      <!-- 物流全流程动态轨迹 -->
      <div class="detail-section">
        <h4 class="section-title">全链路物流生命周期跟踪</h4>
        <el-timeline class="timeline-wrap">
          <el-timeline-item timestamp="2026-10-10 12:14:27" type="primary" size="large">
            <h4>【开单建档】运单创建成功，等待配载调度</h4>
            <p>操作网点：总部【001】 操作员：admin</p>
          </el-timeline-item>
          <el-timeline-item timestamp="2026-10-10 14:30:00" type="warning">
            <h4>【干线配载】配载车次 GX2026101001</h4>
            <p>承运车辆：粤A·88996 司机：赵师傅 (13700000001)</p>
          </el-timeline-item>
          <el-timeline-item timestamp="2026-10-10 16:00:00" type="success">
            <h4>【干线发车】车辆驶离始发枢纽，在途运输中</h4>
            <p>北斗车载定位实时联动已开启</p>
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Location, Position, Right } from '@element-plus/icons-vue';

const visible = ref(false);
const detailData = ref<any>(null);

function open(data: any) {
  detailData.value = data;
  visible.value = true;
}

defineExpose({ open });

function getStatusType(status: string) {
  switch (status) {
    case '开单': return 'info';
    case '配载中': return 'warning';
    case '已发车': return '';
    case '已到站': return 'success';
    case '已签收': return 'success';
    default: return 'info';
  }
}
</script>

<style scoped lang="scss">
.tms-detail-drawer {
  .drawer-content {
    padding: 0 4px;

    .summary-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 14px 16px;
      margin-bottom: 16px;

      .summary-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;

        .item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;

          .highlight {
            color: #2563eb;
            font-size: 15px;
            font-family: Consolas, monospace;
          }
        }
      }

      .route-banner {
        display: flex;
        align-items: center;
        justify-content: space-around;
        background: #ffffff;
        border: 1px dashed #cbd5e1;
        border-radius: 4px;
        padding: 10px 16px;

        .station {
          display: flex;
          flex-direction: column;
          align-items: center;

          .city {
            font-size: 15px;
            font-weight: 700;
            color: #1e293b;
          }

          .net {
            font-size: 11px;
            color: #64748b;
          }
        }

        .arrow-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #3b82f6;

          .line-name {
            font-size: 11px;
            margin-bottom: 2px;
          }
        }
      }
    }

    .parties-card {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;

      .party-col {
        flex: 1;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        overflow: hidden;

        .party-header {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          font-size: 13px;
          font-weight: 700;

          &.sender {
            background-color: #eff6ff;
            color: #1d4ed8;
          }

          &.receiver {
            background-color: #f0fdf4;
            color: #15803d;
          }
        }

        .party-body {
          padding: 10px 12px;
          font-size: 12px;
          color: #475569;
          line-height: 1.6;

          p {
            margin-bottom: 4px;
            &:last-child {
              margin-bottom: 0;
            }
          }
        }
      }
    }

    .detail-section {
      margin-bottom: 20px;

      .section-title {
        font-size: 14px;
        font-weight: 700;
        color: #1e293b;
        margin-bottom: 10px;
        border-left: 3px solid #3b82f6;
        padding-left: 8px;
      }

      .timeline-wrap {
        padding: 10px 12px;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        border-radius: 6px;

        h4 {
          font-size: 13px;
          color: #1e293b;
          margin-bottom: 4px;
        }

        p {
          font-size: 11px;
          color: #64748b;
        }
      }
    }
  }
}
</style>
