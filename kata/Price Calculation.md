# Price Calculation

## Target area

1. Inheritance and polymorphism
1. Arithmetic

## Story

A supermarket is growing in business and would like to automate the price calculation.  Some prices are straightforward while others require some more thinking.

Consider the following examples:

1. Items are sold at a fix price per unit without any special offer or discounts.

    For example, a can of beans is sold for `1.99€`.  Ten cans simply cost ten times the single unit price, `19.90€`.

    | Quantity | Price (`€`) |
    |---------:|------------:|
    |      `1` |      `1.99` |
    |      `2` |      `3.98` |
    |      `5` |      `9.95` |

1. Weighted items are sold based on their weight.

    For example, fruit is sold by its weight.  `1Kg` of banana will cost twice as much as `500g` of the same banana.

    | Weight    | Price (`€`) |
    |----------:|------------:|
    |     `1Kg` |      `1.99` |
    | `0.987Kg` |   `1.96413` |
    | `4.847Kg` |   `9.64553` |

1. Items are on special offer and the prices varies based on the number of items bought.

    For example, the special offer maybe "*you buy 3 items and you pay for only 2*".  If you buy four items, you will pay for three and if you buy six you pay for four, as shown in the following table.

    | Quantity | Special offer applied | Price without special offer | Price with special offer applied |
    |---------:|:---------------------:|----------------------------:|---------------------------------:|
    |      `1` |           NO          |                     `1.10€` |                          `1.10€` |
    |      `2` |           NO          |                     `2.20€` |                          `2.20€` |
    |      `3` |     **YES** (on 3)    |                     `3.30€` |   (pay for 2 and 1 free) `2.20€` |
    |      `4` |     **YES** (on 3)    |                     `4.40€` |   (pay for 3 and 1 free) `3.30€` |
    |      `5` |     **YES** (on 3)    |                     `5.50€` |   (pay for 4 and 1 free) `4.40€` |
    |      `6` |     **YES** (on 6)    |                     `6.60€` |   (pay for 4 and 2 free) `4.40€` |

1. A discount is applied to all items bought if a certain amount is bought.

    For example, a discount of `10%` is applied to all items when three or more items are bought.  One can of olives costs `1.10€`, while three cans will cost `2.97€` (instead `3.30€`).

    | Quantity | Discount applied | Price without discount | Price with discount applied |
    |---------:|:----------------:|-----------------------:|----------------------------:|
    |      `1` |        NO        |                `1.10€` |                     `1.10€` |
    |      `2` |        NO        |                `2.20€` |                     `2.20€` |
    |      `3` |     **YES**      |                `3.30€` |   (`3.30€ - 0.33€`) `2.97€` |
    |      `4` |     **YES**      |                `4.40€` |   (`4.40€ - 0.44€`) `3.96€` |

1. Discount applies to the next items if a certain amount is bought.

    For example, a discount of `50%` is applied to the third and more items when three or more items are bought.  For example, a shaving cream bottle costs `1.99€`, while three bottles will cost `4.98€` (instead of `5.97€`).

    | Quantity | Discount applied | Price without discount | Price with discount applied  |
    |---------:|:----------------:|-----------------------:|-----------------------------:|
    |      `1` |        NO        |                `1.99€` |                      `1.99€` |
    |      `2` |        NO        |                `3.98€` |                      `3.98€` |
    |      `3` |     **YES**      |                `5.97€` |   (`5.97€ - 0.995€`) `4.98€` |
    |      `4` |     **YES**      |                `7.96€` |    (`7.96€ - 1.99€`) `5.97€` |

For this first phase an item will never fall into more than one of the above categories.  For example, fruit will either be a weighted item or discounted item, but never both.

All items bought will appear on the bill as line items.  A line item comprises:

1. Name
1. Quantity (or weight depending on the type)
1. Unit (or kilo grams depending on the type) price
1. (optionally) Offer

A line item needs to:

1. Calculate the price, depending on its type and apply any applicable discounts or offers
1. Produce a description describing the item, quantity bought and the total price

Please note that the supermarket operates across the Euro-Zone.  All monetary values should show the Euro symbol `€` after the number, for example `1.99€`.  Note that while Italy uses a `.` to separate the "*integer part*" from the "*fractional part*", Germany uses a `,`.  This is governed by the [`Locale`](https://docs.oracle.com/en/java/javase/14/docs/api/java.base/java/util/Locale.html).

## Acceptance Criteria

All line items, irrespective of the type, need to

1. Calculate the total price for a line item
1. Provide a description for a line item

### Calculate total price

The following table assumes a unit price of `1.99€`.

| Line Item Type       | Quantity/Weight | Discount/Special Offer             | Total Price (`€`) |
|----------------------|----------------:|------------------------------------|------------------:|
| Item                 |             `1` | Nothing (*qty × price*)            |            `1.99` |
| Item                 |             `5` | Nothing (*qty × price*)            |            `9.95` |
| Weighted item        |           `1Kg` | Nothing (*wgt × price*)            |            `1.99` |
| Weighted item        |       `4.847Kg` | Nothing (*wgt × price*)            |         `9.64553` |
| Discounted item      |             `1` | 10% Discount when buying 3 or more |            `1.99` |
| Discounted item      |             `3` | 10% Discount when buying 3 or more |           `5.373` |
| Discounted item      |             `5` | 10% Discount when buying 3 or more |           `8.955` |
| Special offer        |             `1` | Buy 3 pay for 2                    |            `1.99` |
| Special offer        |             `3` | Buy 3 pay for 2                    |            `3.98` |
| Special offer        |             `5` | Buy 3 pay for 2                    |            `7.96` |
| Discounted next item |             `1` | 50% on the third and more          |            `1.99` |
| Discounted next item |             `3` | 50% on the third and more          |           `4.975` |
| Discounted next item |             `5` | 50% on the third and more          |           `6.965` |

### Provide a description

The following table assumes a name of `Sample` and a unit price of `1.99€`.

| Line Item Type       | Quantity  | Discount/Special Offer             | Description (`de`/`it_IT`)                                                |
|----------------------|----------:|------------------------------------|---------------------------------------------------------------------------|
| Item                 |       `1` | Not applicable                     | `Sample (1 × 1,99€) 1,99€`<br/>`Sample (1 × 1.99€) 1.99€`                 |
| Item                 |       `5` | Not applicable                     | `Sample (5 × 1,99€) 9,95€`<br/>`Sample (5 × 1.99€) 9.95€`                 |
| Weighted item        |     `1Kg` | Not applicable                     | `Sample (1,000Kg × 1,99€) 1,99€`<br/>`Sample (1.000Kg × 1.99€) 1.99€`             |
| Weighted item        | `4.847Kg` | Not applicable                     | `Sample (4,847Kg × 1,99€) 9,65€`<br/>`Sample (4.847Kg × 1.99€) 9.65€`     |
| Discounted item      |       `2` | 10% Discount when buying 3 or more | `Sample (2 × 1,99€) 3,98€`<br/>`Sample (2 × 1.99€) 3.98€`                 |
| Discounted item      |       `5` | 10% Discount when buying 3 or more | `Sample (5 × 1,99€ - 1,00€) 8,96€`<br/>`Sample (5 × 1.99€ - 1.00€) 8.96€` |
| Special offer        |       `2` | Buy 3 pay for 2                    | `Sample (2 × 1,99€) 3,98€`<br/>`Sample (2 × 1.99€) 3.98€`                 |
| Special offer        |       `5` | Buy 3 pay for 2                    | `Sample (5 × 1,99€ - 1,99€) 7,96€`<br/>`Sample (5 × 1.99€ - 1.99€) 7.96€` |
| Discounted next item |       `2` | 50% on the third and more          | `Sample (2 × 1,99€) 3,98€`<br/>`Sample (2 × 1.99€) 3.98€`                 |
| Discounted next item |       `5` | 50% on the third and more          | `Sample (5 × 1,99€ - 2,99€) 6,97€`<br/>`Sample (5 × 1.99€ - 2.99€) 6.97€` |

## Possible Solution

### Item

Tests

```java
package kata;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import java.math.BigDecimal;
import java.util.Locale;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName( "Line item" )
public class LineItemTest {

  @CsvSource( value = {
    "1 | 1.99 | 1.99",
    "5 | 1.99 | 9.95",
  }, delimiter = '|' )
  @DisplayName( "compute price" )
  @ParameterizedTest( name = "should return {2}, for quantity {0} and price {1}" )
  public void shouldCalculatePrice(
    final int quantity,
    final BigDecimal unitPrice,
    final BigDecimal expectedCalculatedPrice
  ) {
    final LineItem subject = new LineItem( "Sample", quantity, unitPrice );
    assertEquals( expectedCalculatedPrice, subject.calculatePrice() );
  }

  @CsvSource( value = {
    "Sample | 1 | 1.99 | de    | Sample (1 × 1,99€) 1,99€",
    "Sample | 5 | 1.99 | de    | Sample (5 × 1,99€) 9,95€",
    "Sample | 5 | 1.99 | it_IT | Sample (5 × 1.99€) 9.95€",
  }, delimiter = '|' )
  @DisplayName( "description" )
  @ParameterizedTest( name = "should return {4}, for an item with name {0}, quantity {1} and price {2} in {3}" )
  public void shouldDescribe(
    final String name,
    final int quantity,
    final BigDecimal unitPrice,
    final Locale locale,
    final String expectedDescription
  ) {
    final LineItem subject = new LineItem( name, quantity, unitPrice );
    assertEquals( expectedDescription, subject.describe( locale ) );
  }
}
```

Implementation

```java
package demo;

import java.math.BigDecimal;
import java.util.Locale;

public class LineItem {

  private final String name;
  private final int quantity;
  private final BigDecimal unitPrice;

  public LineItem( final String name, final int quantity, final BigDecimal unitPrice ) {
    this.name = name;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
  }

  public BigDecimal calculatePrice() {
    return unitPrice.multiply( new BigDecimal( quantity ) );
  }

  public String describe( final Locale locale ) {
    return String.format( locale, "%s (%d × %.2f€) %.2f€", name, quantity, unitPrice, calculatePrice() );
  }
}
```

### Create a base item

Move the name and unit price to a base class as all line items have these two.

```java
package demo;

import java.math.BigDecimal;
import java.util.Locale;

public abstract class BaseLineItem {

  protected final String name;
  protected final BigDecimal unitPrice;

  protected BaseItem( final String name, final BigDecimal unitPrice ) {
    this.name = name;
    this.unitPrice = unitPrice;
  }

  public abstract BigDecimal calculatePrice();

  public abstract String describe( final Locale locale );
}
```

Refactor line item to extend the base line class.

```java
package demo;

import java.math.BigDecimal;
import java.util.Locale;

public class LineItem extends BaseLineItem {

  private final int quantity;

  public LineItem( final String name, final int quantity, final BigDecimal unitPrice ) {
    super( name, unitPrice );
    this.quantity = quantity;
  }

  @Override
  public BigDecimal calculatePrice() {
    return unitPrice.multiply( new BigDecimal( quantity ) );
  }

  @Override
  public String describe( final Locale locale ) {
    return String.format( locale, "%s (%d × %.2f€) %.2f€", name, quantity, unitPrice, calculatePrice() );
  }
}
```

The tests should pass.

### Weighted line item

Tests

```java
package kata;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import java.math.BigDecimal;
import java.util.Locale;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName( "Weighted line item" )
public class WeightedLineItemTest {

  @CsvSource( value = {
    "1     | 1.99 | 1.99",
    "4.847 | 1.99 | 9.64553",
  }, delimiter = '|' )
  @DisplayName( "compute price" )
  @ParameterizedTest( name = "should return {2}, for weight {0} and price {1}" )
  public void shouldCalculatePrice(
    final BigDecimal weight,
    final BigDecimal unitPrice,
    final BigDecimal expectedCalculatedPrice
  ) {
    final WeightedLineItem subject = new WeightedLineItem( "Sample", weight, unitPrice );
    assertEquals( expectedCalculatedPrice, subject.calculatePrice() );
  }

  @CsvSource( value = {
    "Sample | 4.847 | 1.99 | de    | Sample (4,847Kg × 1,99€) 9,65€",
    "Sample | 4.847 | 1.99 | it_IT | Sample (4.847Kg × 1.99€) 9.65€",
    "Sample | 1     | 1.99 | de    | Sample (1,000Kg × 1,99€) 1,99€",
  }, delimiter = '|' )
  @DisplayName( "description" )
  @ParameterizedTest( name = "should return {4}, for an item with name {0}, quantity {1} and price {2} in {3}" )
  public void shouldDescribe(
    final String name,
    final BigDecimal weight,
    final BigDecimal unitPrice,
    final Locale locale,
    final String expectedDescription
  ) {
    final WeightedLineItem subject = new WeightedLineItem( name, weight, unitPrice );
    assertEquals( expectedDescription, subject.describe( locale ) );
  }
}
```

Implementation

```java
package kata;

import java.math.BigDecimal;
import java.util.Locale;

public class WeightedLineItem extends BaseLineItem {

  private final BigDecimal weight;

  protected WeightedLineItem( final String name, final BigDecimal weight, final BigDecimal unitPrice ) {
    super( name, unitPrice );
    this.weight = weight;
  }

  @Override
  public BigDecimal calculatePrice() {
    return weight.multiply( unitPrice );
  }

  @Override
  public String describe( final Locale locale ) {
    return String.format( locale, "%s (%.3fKg × %.2f€) %.2f€", name, weight, unitPrice, calculatePrice() );
  }
}
```

### Discounted item

Test

```java
package kata;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import java.math.BigDecimal;
import java.util.Locale;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName( "Discounted line item" )
public class DiscountedLineItemTest {

  @CsvSource( value = {
    "1 | 1.99 | 3 | 0.1 | 1.99",
    "3 | 1.99 | 3 | 0.1 | 5.373",
    "5 | 1.99 | 3 | 0.1 | 8.955",
  }, delimiter = '|' )
  @DisplayName( "compute price" )
  @ParameterizedTest( name = "should return {4}, for quantity {0}, price {1}, discount threshold {2} and discount {3}" )
  public void shouldCalculatePrice(
    final int quantity,
    final BigDecimal unitPrice,
    final int buyThreshold,
    final BigDecimal discount,
    final BigDecimal expectedCalculatedPrice
  ) {
    final DiscountedLineItem subject = new DiscountedLineItem( "Sample", quantity, unitPrice, buyThreshold, discount );
    assertEquals( expectedCalculatedPrice, subject.calculatePrice() );
  }

  @CsvSource( value = {
    "Sample | 2 | 1.99 | 3 | 0.1 | de    | Sample (2 × 1,99€) 3,98€",
    "Sample | 5 | 1.99 | 3 | 0.1 | de    | Sample (5 × 1,99€ - 10%) 8,96€",
    "Sample | 5 | 1.99 | 3 | 0.1 | it_IT | Sample (5 × 1.99€ - 10%) 8.96€",
  }, delimiter = '|' )
  @DisplayName( "description" )
  @ParameterizedTest( name = "should return {6}, for an item with name {0}, quantity {1}, price {2}, discount threshold {3} and discount {4} in {5}" )
  public void shouldDescribe(
    final String name,
    final int quantity,
    final BigDecimal unitPrice,
    final int discountThreshold,
    final BigDecimal discount,
    final Locale locale,
    final String expectedDescription
  ) {
    final DiscountedLineItem subject = new DiscountedLineItem( name, quantity, unitPrice, discountThreshold, discount );
    assertEquals( expectedDescription, subject.describe( locale ) );
  }
}
```

Implementation

```java
package kata;

import java.math.BigDecimal;
import java.util.Locale;

public class DiscountedLineItem extends BaseLineItem {

  private final int quantity;
  private final int buyThreshold;
  private final BigDecimal discount;

  public DiscountedLineItem(
    final String name,
    final int quantity,
    final BigDecimal unitPrice,
    final int buyThreshold,
    final BigDecimal discount
  ) {
    super( name, unitPrice );
    this.quantity = quantity;
    this.buyThreshold = buyThreshold;
    this.discount = discount;
  }

  @Override
  public BigDecimal calculatePrice() {
    final BigDecimal total = calculateTotal();
    return qualifyForDiscount() ? calculateDiscount( total ) : total;
  }

  @Override
  public String describe( final Locale locale ) {
    final String appliedDiscount = qualifyForDiscount() ?
      String.format( locale, " - %.0f%%", discountAsPercentage() ) : "";
    return String.format( locale, "%s (%d × %.2f€%s) %.2f€", name, quantity, unitPrice, appliedDiscount, calculatePrice() );
  }

  private boolean qualifyForDiscount() {
    return quantity >= buyThreshold;
  }

  private BigDecimal calculateDiscount( final BigDecimal amount ) {
    return amount.subtract( amount.multiply( discount ) );
  }

  private BigDecimal calculateTotal() {
    return unitPrice.multiply( new BigDecimal( quantity ) );
  }

  private BigDecimal discountAsPercentage() {
    return discount.multiply( new BigDecimal( 100 ) );
  }
}
```

### Special Offer

Test

```java
package kata;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import java.math.BigDecimal;
import java.util.Locale;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName( "Special offer line item" )
public class SpecialOfferLineItemTest {

  @CsvSource( value = {
    "1 | 1.99 | 3 | 2 | 1.99",
    "3 | 1.99 | 3 | 2 | 3.98",
    "5 | 1.99 | 3 | 2 | 7.96",
  }, delimiter = '|' )
  @DisplayName( "compute price" )
  @ParameterizedTest( name = "should return {4}, for quantity {0}, price {1} and buy {2} pay for {3}" )
  public void shouldCalculatePrice(
    final int quantity,
    final BigDecimal unitPrice,
    final int buyThreshold,
    final int payFor,
    final BigDecimal expectedCalculatedPrice
  ) {
    final SpecialOfferLineItem subject = new SpecialOfferLineItem( "Sample", quantity, unitPrice, buyThreshold, payFor );
    assertEquals( expectedCalculatedPrice, subject.calculatePrice() );
  }

  @CsvSource( value = {
    "Sample | 2 | 1.99 | 3 | 2 | de    | Sample (2 × 1,99€) 3,98€",
    "Sample | 5 | 1.99 | 3 | 2 | de    | Sample (5 × 1,99€ - 1,99€) 7,96€",
    "Sample | 5 | 1.99 | 3 | 2 | it_IT | Sample (5 × 1.99€ - 1.99€) 7.96€",
  }, delimiter = '|' )
  @DisplayName( "description" )
  @ParameterizedTest( name = "should return {4}, for an item with name {0}, quantity {1} and price {2} in {3}" )
  public void shouldDescribe(
    final String name,
    final int quantity,
    final BigDecimal unitPrice,
    final int buyThreshold,
    final int payFor,
    final Locale locale,
    final String expectedDescription
  ) {
    final SpecialOfferLineItem subject = new SpecialOfferLineItem( name, quantity, unitPrice, buyThreshold, payFor );
    assertEquals( expectedDescription, subject.describe( locale ) );
  }
}
```

Implementation

```java
package kata;

import java.math.BigDecimal;
import java.util.Locale;

public class SpecialOfferLineItem extends BaseLineItem {

  private final int quantity;
  private final int buyThreshold;
  private final int payFor;

  public SpecialOfferLineItem( final String name, final int quantity, final BigDecimal unitPrice, final int buyThreshold,
    final int payFor ) {
    super( name, unitPrice );
    this.quantity = quantity;
    this.buyThreshold = buyThreshold;
    this.payFor = payFor;
  }

  @Override public BigDecimal calculatePrice() {
    final int effectiveQuantity = calculateEffectiveQuantity();
    return unitPrice.multiply( new BigDecimal( effectiveQuantity ) );
  }

  @Override public String describe( final Locale locale ) {
    final String appliedDiscount = qualifyForDiscount() ?
      String.format( locale, " - %.2f€", computeDiscount() ) : "";
    return String.format( locale, "%s (%d × %.2f€%s) %.2f€", name, quantity, unitPrice, appliedDiscount, calculatePrice() );
  }

  private BigDecimal computeDiscount() {
    final int effectiveQuantity = calculateEffectiveQuantity();
    final int difference = quantity - effectiveQuantity;
    return unitPrice.multiply( new BigDecimal( difference ) );
  }

  private boolean qualifyForDiscount() {
    return quantity >= buyThreshold;
  }

  private int calculateEffectiveQuantity() {
    return ( quantity / buyThreshold * payFor ) + quantity % buyThreshold;
  }
}
```

### Discounted next item

Test

```java
package kata;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import java.math.BigDecimal;
import java.util.Locale;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName( "Discounted next line item" )
public class DiscountedNextLineItemTest {

  @CsvSource( value = {
    "1 | 1.99 | 3 | 0.5 | 1.99",
    "3 | 1.99 | 3 | 0.5 | 4.975",
    "5 | 1.99 | 3 | 0.5 | 6.965",
  }, delimiter = '|' )
  @DisplayName( "compute price" )
  @ParameterizedTest( name = "should return {4}, for quantity {0}, price {1}, discount threshold {2} and discount {3}" )
  public void shouldComputePrice(
    final int quantity,
    final BigDecimal unitPrice,
    final int discountThreshold,
    final BigDecimal discount,
    final BigDecimal expectedCalculatedPrice
  ) {
    final DiscountedNextLineItem subject =
      new DiscountedNextLineItem( "Sample", quantity, unitPrice, discountThreshold, discount );
    assertEquals( expectedCalculatedPrice, subject.calculatePrice() );
  }

  @CsvSource( value = {
    "Sample | 2 | 1.99 | 3 | 0.5 | de    | Sample (2 × 1,99€) 3,98€",
    "Sample | 5 | 1.99 | 3 | 0.5 | de    | Sample (5 × 1,99€ - 2,99€) 6,97€",
    "Sample | 5 | 1.99 | 3 | 0.5 | it_IT | Sample (5 × 1.99€ - 2.99€) 6.97€",
  }, delimiter = '|' )
  @DisplayName( "description" )
  @ParameterizedTest( name = "should return {6}, for an item with name {0}, quantity {1}, price {2}, discount threshold {3} and discount {4} in {5}" )
  public void shouldDescribe(
    final String name,
    final int quantity,
    final BigDecimal unitPrice,
    final int discountThreshold,
    final BigDecimal discount,
    final Locale locale,
    final String expectedDescription
  ) {
    final DiscountedNextLineItem subject = new DiscountedNextLineItem( name, quantity, unitPrice, discountThreshold, discount );
    assertEquals( expectedDescription, subject.describe( locale ) );
  }
}
```

Implementation

```java
package kata;

import java.math.BigDecimal;
import java.util.Locale;

public class DiscountedNextLineItem extends BaseLineItem {

  private final int quantity;
  private final int buyThreshold;
  private final BigDecimal discount;

  public DiscountedNextLineItem( final String name, final int quantity, final BigDecimal unitPrice, final int buyThreshold,
    final BigDecimal discount ) {
    super( name, unitPrice );
    this.quantity = quantity;
    this.buyThreshold = buyThreshold;
    this.discount = discount;
  }

  @Override
  public BigDecimal calculatePrice() {
    final BigDecimal total = unitPrice.multiply( new BigDecimal( quantity ) );
    return qualifyForDiscount() ? total.subtract( calculateDiscount() ) : total;
  }

  @Override
  public String describe( final Locale locale ) {
    final String appliedDiscount = qualifyForDiscount() ?
      String.format( locale, " - %.2f€", calculateDiscount() ) : "";
    return String.format( locale, "%s (%d × %.2f€%s) %.2f€", name, quantity, unitPrice, appliedDiscount, calculatePrice() );
  }

  private BigDecimal calculateDiscount() {
    return unitPrice.multiply( new BigDecimal( quantity - buyThreshold + 1 ) ).multiply( discount );
  }

  private boolean qualifyForDiscount() {
    return quantity >= buyThreshold;
  }
}
```
