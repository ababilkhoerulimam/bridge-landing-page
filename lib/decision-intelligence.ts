import { DecisionAnalysisRequest, DecisionAnalysisResponse } from "@/types/bridge"

/**
 * Exact line-by-line TypeScript implementation of the Decision Intelligence rule engine algorithm.
 * Matches python prototype/decision_intelligence/app.py 1:1.
 */
export function analyzeBatch(payload: DecisionAnalysisRequest): DecisionAnalysisResponse {
  const temp = payload.temperature
  const clay = payload.clay
  const speed = payload.pusherSpeed

  // 1. Base yield prediction is 90%
  let predictedGradeA = 90.0

  // Penalize for temperature deviations from optimal range [1100, 1250]
  if (temp < 1100 || temp > 1250) {
    predictedGradeA -= Math.abs(temp - 1175) * 0.06
  }

  // Penalize for clay composition deviations from optimal [45, 55]
  if (clay < 45 || clay > 55) {
    predictedGradeA -= Math.abs(clay - 50) * 0.5
  }

  // Penalize for pusher speed deviations from optimal [25, 40]
  if (speed < 25 || speed > 40) {
    predictedGradeA -= Math.abs(speed - 32.5) * 0.4
  }

  // Clamp yield prediction to [60.0, 98.2]
  predictedGradeA = Math.max(60.0, Math.min(98.2, Math.round(predictedGradeA * 10) / 10))

  // 2. Defect rate calculation
  let predictedDefectRate = 2.4
  if (predictedGradeA < 95.0) {
    predictedDefectRate += (95.0 - predictedGradeA) * 0.22
  }
  predictedDefectRate = Math.max(1.1, Math.min(20.0, Math.round(predictedDefectRate * 10) / 10))

  // 3. Confidence score based on data variance
  let confidence = 96 - Math.floor(Math.abs(temp - 1175) * 0.05 + Math.abs(clay - 50) * 0.4)
  confidence = Math.max(70, Math.min(98, confidence))

  // 4. Expected COGS Savings calculation
  let expectedSavings = 15000000
  if (predictedGradeA > 88.0) {
    expectedSavings += Math.floor((predictedGradeA - 88.0) * 1200000)
  } else if (predictedGradeA < 80.0) {
    expectedSavings -= Math.floor((80.0 - predictedGradeA) * 900000)
  }
  expectedSavings = Math.max(2000000, Math.min(25000000, expectedSavings))

  // 5. Risk Warnings & Recommended Actions
  let riskLevel: "LOW" | "MEDIUM" | "HIGH" = "LOW"
  let riskWarning = "Parameter operasi kiln dalam batas nominal standar."
  let recommendedAction =
    "Lanjutkan operasi normal. Formula bahan baku saat ini optimal untuk efisiensi termal zona pembakaran."
  let businessImpact =
    "Produksi berjalan efisien dengan proyeksi reject minimal (< 3%). Margin operasional terjaga pada target 85%."

  if (temp > 1300) {
    riskLevel = "HIGH"
    riskWarning =
      "Suhu kiln terdeteksi kritis tinggi (>1300°C), meningkatkan risiko retak termal dan konsumsi gas berlebih."
    recommendedAction =
      "Turunkan laju aliran gas pembakar sebesar 5-8% secara bertahap dan tingkatkan pengawasan visual sensor termal."
    businessImpact =
      "Menghindari potensi defect massal senilai Rp 8.4 Juta/shift akibat produk retak serta menghemat pemborosan bahan bakar gas."
  } else if (temp < 1000) {
    riskLevel = "MEDIUM"
    riskWarning =
      "Suhu kiln terlalu rendah (<1000°C), risiko pembakaran tidak matang sempurna (underfired/biskuit rapuh)."
    recommendedAction =
      "Tingkatkan laju aliran gas pembakar dan perlambat kecepatan pusher ke 28 RPM untuk memperpanjang dwell time."
    businessImpact =
      "Mengurangi risiko recall produk akibat kekuatan mekanis keramik yang tidak memenuhi standar SNI."
  } else if (clay > 58) {
    riskLevel = "MEDIUM"
    riskWarning =
      "Kandungan clay sangat tinggi (>58%), berisiko menyebabkan penyusutan berlebih dan deformasi fisik keramik."
    recommendedAction =
      "Kurangi komposisi clay dan tambahkan proporsi kuarsa (quartz) sebesar 3% untuk menstabilkan struktur penyusutan."
    businessImpact =
      "Menjaga presisi dimensi fisik keramik agar sesuai dengan toleransi ukuran pasar ekspor."
  } else if (speed > 48) {
    riskLevel = "HIGH"
    riskWarning =
      "Kecepatan dorong pusher sangat tinggi (>48 RPM), waktu tinggal (dwell time) dalam kiln terlalu singkat."
    recommendedAction =
      "Batasi kecepatan pusher maksimal 40 RPM untuk menjamin pematangan keramik secara merata di zona tengah."
    businessImpact =
      "Mencegah peningkatan reject internal akibat kematangan keratangan yang tidak seragam di dalam kiln."
  }

  return {
    predicted_grade_a: predictedGradeA,
    predicted_defect_rate: predictedDefectRate,
    confidence,
    expected_savings: expectedSavings,
    risk_level: riskLevel,
    risk_warning: riskWarning,
    recommended_action: recommendedAction,
    business_impact: businessImpact,
  }
}
