# Price Calculation

## Target area

1. Inheritance and polymorphism
1. Arithmetic

## Story

A supermarket is growing in business and would like to automate the price calculation.  Some prices are straightforward while others require some more thinking.

Consider the following examples:

1. Items are sold at a fix price per unit without any special offer or discounts.

    For example, a can of beans is sold for `1.99€`.  Ten cans simply cost ten times the single unit price, `19.90€`.

    | Quantity | Price   |
    |---------:|--------:|
    |      `1` | `1.10€` |
    |      `2` | `2.20€` |
    |      `5` | `5.50€` |

1. Weighted items are sold based on their weight.

    For example, fruit is sold by its weight.  `1Kg` of banana will cost twice as much as `500g` of the same banana.

    | Weight    | Price   |
    |----------:|--------:|
    |     `1Kg` | `1.10€` |
    | `0.987Kg` | `1.09€` |
    | `4.357Kg` | `4.79€` |

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

| Line Item Type       | Quantity/Weight | Discount/Special Offer             | Total Price |
|----------------------|----------------:|------------------------------------|------------:|
| Item                 |             `1` | Nothing (*qty × price*)            |     `1.99€` |
| Item                 |             `5` | Nothing (*qty × price*)            |     `9.95€` |
| Weighted item        |       `0.987Kg` | Nothing (*wgt × price*)            |     `1.96€` |
| Weighted item        |       `4.847Kg` | Nothing (*wgt × price*)            |     `9.65€` |
| Discounted item      |             `1` | 10% Discount when buying 3 or more |     `1.99€` |
| Discounted item      |             `2` | 10% Discount when buying 3 or more |     `3.98€` |
| Discounted item      |             `3` | 10% Discount when buying 3 or more |     `5.37€` |
| Special offer        |             `1` | Buy 3 pay for 2                    |     `1.99€` |
| Special offer        |             `3` | Buy 3 pay for 2                    |     `3.98€` |
| Special offer        |             `5` | Buy 3 pay for 2                    |     `7.96€` |
| Discounted next item |             `1` | 50% on the third and more          |     `1.99€` |
| Discounted next item |             `2` | 50% on the third and more          |     `3.98€` |
| Discounted next item |             `3` | 50% on the third and more          |     `4.98€` |

### Provide a description

The following table assumes a name of `Sample` and a unit price of `1.99€`.

| Line Item Type       | Quantity  | Discount/Special Offer             | Description (`de`)                 | Description (`it_IT`)              |
|----------------------|----------:|------------------------------------|------------------------------------|------------------------------------|
| Item                 |       `5` | Not applicable                     | `Sample (5 × 1,99€) 9,95€`         | `Sample (5 × 1.99€) 9.95€`         |
| Weighted item        | `4.248Kg` | Not applicable                     | `Sample (4,248Kg × 1,99€) 8,45€`   | `Sample (4.248Kg × 1.99€) 8.45€`   |
| Discounted item      |       `2` | 10% Discount when buying 3 or more | `Sample (2 × 1,99€) 3,98€`         | `Sample (2 × 1.99€) 3.98€`         |
| Discounted item      |       `5` | 10% Discount when buying 3 or more | `Sample (5 × 1,99€ - 1,00€) 8,96€` | `Sample (5 × 1.99€ - 1.00€) 8.96€` |
| Special offer        |       `2` | Buy 3 pay for 2                    | `Sample (2 × 1,99€) 3,98€`         | `Sample (2 × 1.99€) 3.98€`         |
| Special offer        |       `5` | Buy 3 pay for 2                    | `Sample (5 × 1,99€ - 1,99€) 7,96€` | `Sample (5 × 1.99€ - 1.99€) 7.96€` |

## Possible Solution

### 1

```java
package demo;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import java.math.BigDecimal;
import java.util.Locale;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName( "Line item" )
public class LineItemTest {

  @CsvSource( value = {
    "5 | 0.50 | 2.50",
    "2 | 1.99 | 3.98",
  }, delimiter = '|' )
  @DisplayName( "compute price" )
  @ParameterizedTest( name = "should return {2}, for quantity {0} and price {1}" )
  public void shouldComputePrice(
    final int quantity,
    final BigDecimal unitPrice,
    final BigDecimal expectedComputedPrice
  ) {
    final LineItem subject = new LineItem( "Test item", quantity, unitPrice );
    assertEquals( 0, expectedComputedPrice.compareTo( subject.calculatePrice() ) );
  }

  @CsvSource( value = {
    "Pack of spaghetti | 5 | 0.50 | de    | Pack of spaghetti (5 × 0,50€) 2,50€",
    "Pack of spaghetti | 5 | 0.50 | it_IT | Pack of spaghetti (5 × 0.50€) 2.50€",
    "Can of beans      | 2 | 1.99 | de    | Can of beans (2 × 1,99€) 3,98€",
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

### 2

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

### 3

```java
package demo;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import java.math.BigDecimal;
import java.util.Locale;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName( "Weighted line item" )
public class WeightedLineItemTest {

  @CsvSource( value = {
    "4.248 | 1.99 | 8.45352",
    "0.987 | 1.99 | 1.96413",
  }, delimiter = '|' )
  @DisplayName( "compute price" )
  @ParameterizedTest( name = "should return {2}, for weight {0} and price {1}" )
  public void shouldComputePrice(
    final BigDecimal weight,
    final BigDecimal unitPrice,
    final BigDecimal expectedComputedPrice
  ) {
    final WeightedLineItem subject = new WeightedLineItem( "Test item", weight, unitPrice );
    assertEquals( 0, expectedComputedPrice.compareTo( subject.calculatePrice() ) );
  }

  @CsvSource( value = {
    "Banana | 4.248 | 1.99 | de    | Banana (4,248Kg × 1,99€) 8,45€",
    "Banana | 4.248 | 1.99 | it_IT | Banana (4.248Kg × 1.99€) 8.45€",
    "Apple  | 0.987 | 1.49 | de    | Apple (0,987Kg × 1,49€) 1,47€",
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

```java
package demo;

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

### 4

```java
package demo;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import java.math.BigDecimal;
import java.util.Locale;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DisplayName( "Discounted line item" )
public class DiscountedLineItemTest {

  @CsvSource( value = {
    "5 | 0.50 | 3 | 0.1 | 2.25",
    "2 | 1.99 | 3 | 0.1 | 3.98",
  }, delimiter = '|' )
  @DisplayName( "compute price" )
  @ParameterizedTest( name = "should return {4}, for quantity {0}, price {1}, discount threshold {2} and discount {3}" )
  public void shouldComputePrice(
    final int quantity,
    final BigDecimal unitPrice,
    final int discountThreshold,
    final BigDecimal discount,
    final BigDecimal expectedComputedPrice
  ) {
    final DiscountedLineItem subject = new DiscountedLineItem( "Test item", quantity, unitPrice, discountThreshold, discount );
    assertEquals( 0, expectedComputedPrice.compareTo( subject.calculatePrice() ) );
  }

  @CsvSource( value = {
    "Pack of spaghetti | 5 | 0.50 | 3 | 0.1 | de    | Pack of spaghetti (5 × 0,50€ - 10%) 2,25€",
    "Pack of spaghetti | 5 | 0.50 | 3 | 0.1 | it_IT | Pack of spaghetti (5 × 0.50€ - 10%) 2.25€",
    "Can of beans      | 2 | 1.99 | 3 | 0.1 | de    | Can of beans (2 × 1,99€) 3,98€",
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

```java
package demo;

import java.math.BigDecimal;
import java.util.Locale;

public class DiscountedLineItem extends BaseLineItem {

  private final int quantity;
  private final int discountThreshold;
  private final BigDecimal discount;

  public DiscountedLineItem(
    final String name,
    final int quantity,
    final BigDecimal unitPrice,
    final int discountThreshold,
    final BigDecimal discount
  ) {
    super( name, unitPrice );
    this.quantity = quantity;
    this.discountThreshold = discountThreshold;
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
      String.format( " - %.0f%%", discountAsPercentage() ) : "";
    return String.format( locale, "%s (%d × %.2f€%s) %.2f€", name, quantity, unitPrice, appliedDiscount, calculatePrice() );
  }

  private boolean qualifyForDiscount() {
    return quantity >= discountThreshold;
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

### 5
