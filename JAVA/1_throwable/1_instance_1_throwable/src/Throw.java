import java.io.IOException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Throw extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        //source
        String s = request.getParameter("t1") ;
        //pattern
        Exception e = new Exception(s) ;
        //sink
        response.getWriter().write(e.getMessage());
        response.getWriter().flush();
        }
    }