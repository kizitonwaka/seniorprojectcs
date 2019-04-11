//this component converts a number to us dollars
import { CurrencyPipe } from '@angular/common';

/**usage
 * import class
 * return CurrencyUtil.format(number)
 */
export class CurrencyUtil {
    public static format (amt: number): string {
        return new CurrencyPipe('en-US').transform(amt, 'USD', 'symbol', '1.2-2');
    }
}