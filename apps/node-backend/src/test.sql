SELECT 
  C.*, 
  ROUND(SUM(O.amount), 2) spending, 
  COUNT(OI.id) consumption, 
  json_set(
    '{
      "value": CPF.value,
      "issued_at": CPF.issued_at
    }',
    '$', json_build_object('value', CPF.value, 'issued_at', CPF.issued_at)
  )
FROM customers C
LEFT JOIN cpfs CPF ON CPF.customer_id = C.id 
LEFT JOIN rgs RG ON RG.customer_id = C.id
LEFT JOIN phones P ON P.customer_id = C.id
LEFT JOIN orders O ON O.customer_id = C.id 
LEFT JOIN order_items OI ON O.item_id = OI.id
GROUP BY C.id, CPF.value, CPF.issued_at
